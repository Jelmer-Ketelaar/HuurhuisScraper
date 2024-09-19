import re
import time
import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

from db_connector import save_listing, listing_exists, db_connection
from send_notification import send_notification

# Maak een sessie met retry-logica
session = requests.Session()
retry = Retry(connect=3, backoff_factor=1)
adapter = HTTPAdapter(max_retries=retry)
session.mount('http://', adapter)
session.mount('https://', adapter)

# Lijst om al verwerkte links bij te houden (voorkomt dubbele checks binnen dezelfde sessie)
processed_links = set()

# Functie om Google en Bing zoekresultaten te scrapen
def search_web(query, num_results=20, search_engine="google"):
    ua = UserAgent()
    headers = {'User-Agent': ua.random}

    if search_engine == "google":
        search_url = f"https://www.google.com/search?q={query}&num={num_results}"
    elif search_engine == "bing":
        search_url = f"https://www.bing.com/search?q={query}&count={num_results}"
    else:
        search_url = f"https://duckduckgo.com/html?q={query}"

    response = session.get(search_url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        results = []

        if search_engine == "google":
            for g in soup.find_all('div', class_='g'):
                anchors = g.find_all('a')
                if anchors:
                    link = anchors[0]['href']
                    if link not in processed_links:  # Voeg alleen nieuwe links toe
                        results.append(link)
        elif search_engine == "bing":
            for item in soup.find_all('li', class_='b_algo'):
                a = item.find('a')
                if a:
                    link = a['href']
                    if link not in processed_links:  # Voeg alleen nieuwe links toe
                        results.append(link)
        return results
    else:
        print(f"Search failed with status code: {response.status_code}")
        return []

# Functie om de status van een pagina te controleren
def check_page_status(url):
    try:
        response = session.get(url, timeout=10)
        if response.status_code in [404, 410]:
            print(f"Pagina niet gevonden of verwijderd (404 of 410): {url}")
            return False
        return True
    except requests.RequestException as e:
        print(f"Fout bij het openen van de pagina: {url} - {e}")
        return False

# Functie om de prijs correct te verwerken
def clean_price(price_text):
    price_text = re.sub(r"\D", '', price_text)  # Verwijder alles behalve cijfers
    try:
        return int(price_text)
    except ValueError:
        return None  # Retourneer None als het geen geldige prijs was

# Functie om te controleren of de locatie in Dordrecht ligt
def is_location_in_dordrecht(location):
    if not location or location.lower() == "locatie onbekend":
        print(f"Locatie onbekend opgegeven. Aanname: Dordrecht, Nederland")
        return True

    if "dordrecht" not in location.lower():
        location += ", Dordrecht"
    if "nederland" not in location.lower():
        location += ", Nederland"

    # API request om de locatie te valideren
    url = f"https://nominatim.openstreetmap.org/search?q={location}&format=json&addressdetails=1&countrycodes=NL"

    try:
        time.sleep(1)  # Voeg vertraging toe om rate-limiting te voorkomen
        response = session.get(url, timeout=10)
        if response.status_code != 200 or not response.content:
            print(f"Lege of foutieve respons van de API voor locatie: {location}")
            return False

        data = response.json()
        if data:
            address = data[0].get('address', {})
            if 'city' in address and address['city'].lower() == 'dordrecht' and address['country_code'] == 'nl':
                return True
            if 'town' in address and address['town'].lower() == 'dordrecht' and address['country_code'] == 'nl':
                return True

        print(f"Geen geldige locatiegegevens gevonden voor: {location}")
        return False
    except requests.RequestException as e:
        print(f"Fout bij het valideren van locatie: {e}")
        return False

# Functie om huurwoningen te scrapen van meerdere websites
def scrape_with_ai():
    queries = [
        "huurwoningen in Dordrecht onder 1250 euro",
        "appartement huren Dordrecht max 1250",
        "woning huren Dordrecht goedkoop"
    ]

    google_results = []
    bing_results = []

    for query in queries:
        google_results.extend(search_web(query, num_results=20, search_engine="google"))
        bing_results.extend(search_web(query, num_results=20, search_engine="bing"))

    # Voeg de gevonden links toe aan de bestaande lijst met te scrapen websites
    websites = [
        'https://www.pararius.nl/huurwoningen/dordrecht/0-1200',
        'https://www.huurwoningen.nl/in/dordrecht/?price=0-1200',
        'https://rentumo.nl/huurwoningen?location=dordrecht&rent=1200',
        'https://rentola.nl/huurwoningen?rent=0-1250'
    ]

    # Unieke links samenvoegen en Funda-URL's uitsluiten
    websites = list(set(websites + [site for site in google_results if 'funda' not in site] +
                        [site for site in bing_results if 'funda' not in site]))

    for site in websites:
        if site not in processed_links:  # Controleer of de site al verwerkt is
            processed_links.add(site)  # Voeg toe aan de verwerkte links
            print(f"Scraping website: {site}")
            scrape_listing_from_url(site)

# Functie om huurwoningen te scrapen van een gegeven URL
def scrape_listing_from_url(url):
    if not check_page_status(url):
        return

    response = session.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    listings = soup.find_all('section', class_='listing-search-item')  # Specifiek voor Pararius en Huurwoningen.nl
    for listing in listings:
        title = listing.find('a', class_='listing-search-item__link--title').text.strip()
        price_text = listing.find('div', class_='listing-search-item__price').text.strip()
        price = clean_price(price_text)

        if price is None or price > 1250:
            print(f"Prijs niet gevonden of te hoog voor: {title}")
            continue

        location_element = listing.find('div', class_='listing-search-item__location')
        location = location_element.text.strip() if location_element else "Locatie onbekend"

        if not is_location_in_dordrecht(location):
            print(f"Woning niet in Dordrecht volgens API: {title}, Locatie: {location}")
            continue

        link_element = listing.find('a', class_='listing-search-item__link--title')
        if link_element and 'href' in link_element.attrs:
            link = link_element['href']

            if not link.startswith('http'):
                if 'pararius' in url:
                    link = 'https://www.pararius.nl' + link
                elif 'huurwoningen' in url:
                    link = 'https://www.huurwoningen.nl' + link

            if not check_page_status(link):
                continue
        else:
            print(f"Link niet gevonden voor vermelding: {title}")
            continue

        print(f"Controleer database voor: {link}")
        if not listing_exists(db_connection, link):
            print(f"Opslaan in database: {title}")
            save_listing(db_connection, title, price, location, link, url)
            print(f"Verstuur notificatie voor: {title}")
            send_notification(title, price, location, link, url)
        else:
            print(f"Woning bestaat al in de database: {title}")

# Start de scraping functie handmatig of via een scheduler
scrape_with_ai()
