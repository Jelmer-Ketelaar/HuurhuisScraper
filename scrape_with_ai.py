import re
import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from db_connector import save_listing, listing_exists, db_connection
from send_notification import send_notification
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Helper om een sessie met retry-logica aan te maken
def create_session():
    session = requests.Session()
    retry = Retry(connect=3, backoff_factor=1)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('https://', adapter)
    return session

# Globale sessie gebruiken
session = create_session()

# Lijst om verwerkte links bij te houden (voorkomt dubbele checks binnen dezelfde sessie)
processed_links = set()

# Functie om webpagina's te scrapen (Google/Bing)
def search_web(query, num_results=20, search_engine="google"):
    ua = UserAgent()
    headers = {'User-Agent': ua.random}

    search_url = {
        "google": f"https://www.google.com/search?q={query}&num={num_results}",
        "bing": f"https://www.bing.com/search?q={query}&count={num_results}",
        "duckduckgo": f"https://duckduckgo.com/html?q={query}"
    }.get(search_engine, None)

    if not search_url:
        logger.error(f"Onbekende zoekmachine: {search_engine}")
        return []

    response = session.get(search_url, headers=headers)
    if response.status_code != 200:
        logger.error(f"Zoekopdracht mislukt met status code: {response.status_code}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    return extract_search_results(soup, search_engine)

# Functie om zoekresultaten te extraheren uit de HTML
def extract_search_results(soup, search_engine):
    results = []
    if search_engine == "google":
        for g in soup.find_all('div', class_='g'):
            anchors = g.find_all('a')
            if anchors:
                link = anchors[0]['href']
                if link not in processed_links:
                    results.append(link)
    elif search_engine == "bing":
        for item in soup.find_all('li', class_='b_algo'):
            a = item.find('a')
            if a:
                link = a['href']
                if link not in processed_links:
                    results.append(link)
    return results

# Functie om pagina-status te controleren
def check_page_status(url):
    try:
        response = session.get(url, timeout=10)
        if response.status_code in [404, 410]:
            logger.warning(f"Pagina niet gevonden of verwijderd: {url}")
            return False
        return True
    except requests.RequestException as e:
        logger.error(f"Fout bij het openen van de pagina: {url} - {e}")
        return False

# Functie om de prijs te extraheren en te normaliseren
def clean_price(price_text):
    try:
        price = re.sub(r"\D", '', price_text)
        return int(price)
    except ValueError:
        logger.error(f"Ongeldige prijs: {price_text}")
        return None

# Functie om huurwoningen van een URL te scrapen
def scrape_listing_from_url(url):
    if not check_page_status(url):
        return

    response = session.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    listings = soup.find_all('section', class_='listing-search-item')

    for listing in listings:
        process_listing(listing, url)

# Functie om een enkele woningvermelding te verwerken
def process_listing(listing, source_url):
    title = listing.find('a', class_='listing-search-item__link--title').text.strip()
    price_text = listing.find('div', class_='listing-search-item__price').text.strip()
    price = clean_price(price_text)

    if price is None or price > 1250:
        logger.info(f"Prijs niet gevonden of te hoog voor: {title}")
        return

    location_element = listing.find('div', class_='listing-search-item__location')
    location = location_element.text.strip() if location_element else "Locatie onbekend"

    link_element = listing.find('a', class_='listing-search-item__link--title')
    link = build_full_link(link_element, source_url)

    if not link or not check_page_status(link):
        return

    if not listing_exists(db_connection, link):
        save_listing_and_notify(title, price, location, link, source_url)
    else:
        logger.info(f"Woning bestaat al in de database: {title}")

# Helper-functie om een volledige link te bouwen
def build_full_link(link_element, source_url):
    if link_element and 'href' in link_element.attrs:
        link = link_element['href']
        return link if link.startswith('http') else f'{source_url.rstrip("/")}/{link.lstrip("/")}'
    logger.error("Link niet gevonden")
    return None

# Functie om vermelding op te slaan en notificatie te versturen
def save_listing_and_notify(title, price, location, link, source):
    logger.info(f"Opslaan in database: {title}")
    save_listing(db_connection, title, price, location, link, source)
    logger.info(f"Verstuur notificatie voor: {title}")
    send_notification(title, price, location, link, source)

# Scraping met dynamische filters
def scrape_with_ai(city=None, rent_max=None, custom_queries=None):
    city = city or input("Enter city: ")
    rent_max = int(rent_max or input("Enter maximum rent: "))
    custom_queries = custom_queries or [
        f"huurwoningen in {city} onder {rent_max} euro",
        f"appartement huren {city} max {rent_max}",
        f"woning huren {city} goedkoop"
    ]

    google_results = []
    bing_results = []

    for query in custom_queries:
        google_results.extend(search_web(query, num_results=20, search_engine="google"))
        bing_results.extend(search_web(query, num_results=20, search_engine="bing"))

    # Voeg alleen de zoekresultaten toe aan de lijst van te scrapen websites
    websites = set(google_results + bing_results)

    for site in websites:
        if site not in processed_links:
            processed_links.add(site)
            logger.info(f"Scraping website: {site}")
            scrape_listing_from_url(site)

# Start de scraping functie
scrape_with_ai()
