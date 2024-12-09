import logging
import re

import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from db_connector import save_listing, listing_exists, db_connection

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Helper om een scraping sessie met retry-logica aan te maken
def create_scraping_session():
    scraping_session_instance = requests.Session()
    retry = Retry(connect=3, backoff_factor=1)
    adapter = HTTPAdapter(max_retries=retry)
    scraping_session_instance.mount('https://', adapter)
    return scraping_session_instance


# Globale scraping sessie gebruiken
global_scraping_session = create_scraping_session()
processed_links = set()


# Webpagina scrapen
def search_web(query, num_results=20, search_engine="google"):
    ua = UserAgent()
    headers = {'User-Agent': ua.random}

    GOOGLE_SEARCH_URL = f"https://www.google.com/search?q={query}&num={num_results}"

    search_url = {
        "google": GOOGLE_SEARCH_URL.format(query=query, num_results=num_results),
    }.get(search_engine, None)

    if not search_url:
        logger.error(f"Onbekende zoekmachine: {search_engine}")
        return []

    try:
        response = global_scraping_session.get(search_url, headers=headers)
        response.raise_for_status()  # Check for HTTP errors
    except requests.RequestException as e:
        logger.error(f"Fout bij het uitvoeren van de zoekopdracht: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    return extract_search_results(soup, search_engine)


# Extract search results
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


# Scraping logica met geavanceerde filters
def scrape_with_ai(city, rent_min, rent_max, neighborhood=None, home_type=None):
    queries = [
        f"huurwoningen in {city} tussen {rent_min} en {rent_max} euro",
        f"appartement huren in {city} tussen {rent_min} en {rent_max} euro"
    ]

    # Voeg geavanceerde filters toe aan de zoekopdracht
    if neighborhood:
        queries.append(f"huurwoningen in {neighborhood} in {city}")
    if home_type:
        queries.append(f"{home_type} huren in {city}")

    google_results = []
    bing_results = []

    for query in queries:
        google_results.extend(search_web(query, num_results=20, search_engine="google"))
        bing_results.extend(search_web(query, num_results=20, search_engine="bing"))

    # Voeg unieke websites toe voor scraping
    websites = set(google_results + bing_results)

    for site in websites:
        if site not in processed_links:
            processed_links.add(site)
            try:
                scrape_listing_from_url(site, rent_min, rent_max)
            except Exception as e:
                logger.error(f"Fout bij het scrapen van {site}: {e}")


# Scrapen van een woningvermelding
def scrape_listing_from_url(url, rent_min, rent_max):
    try:
        response = global_scraping_session.get(url)
        response.raise_for_status()  # Controleer op fouten
    except requests.RequestException as e:
        logger.error(f"Fout bij het openen van URL: {url} - {e}")
        return

    soup = BeautifulSoup(response.content, 'html.parser')
    listings = soup.find_all('section', class_='listing-search-item')

    for listing in listings:
        process_listing(listing, url, rent_min, rent_max)


# Verwerken van een enkele woningvermelding
def process_listing(listing, source_url, rent_min, rent_max):
    try:
        title = listing.find('a', class_='listing-search-item__link--title').text.strip()
        price_text = listing.find('div', class_='listing-search-item__price').text.strip()
        price = clean_price(price_text)

        if price is None or price < rent_min or price > rent_max:
            return

        location = listing.find('div', class_='listing-search-item__location').text.strip()
        link = listing.find('a', class_='listing-search-item__link--title')['href']

        if not listing_exists(db_connection, link):
            save_listing(db_connection, title, price, location, link, source_url)
    except Exception as e:
        logger.error(f"Fout bij het verwerken van de woningvermelding: {e}")


# Functie om prijs te verwerken
def clean_price(price_text):
    try:
        return int(re.sub(r"\D", '', price_text))
    except ValueError:
        return None
