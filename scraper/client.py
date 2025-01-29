import requests
from typing import List, Dict, Optional
from datetime import datetime
import os
from dataclasses import dataclass

@dataclass
class Listing:
    id: str
    title: str
    description: str
    price: float
    location: str
    bedrooms: int
    size: float
    url: str
    source: str
    available_from: str
    images: List[str]

class HuurhuisScraperClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.headers = {
            'Content-Type': 'application/json',
            'x-api-key': api_key
        }

    def authenticate(self) -> Optional[str]:
        """Authenticate with the API and get a session token."""
        try:
            response = requests.post(
                f"{self.base_url}/api/scraper/auth",
                headers=self.headers
            )
            response.raise_for_status()
            data = response.json()
            if data['success']:
                return data['data']['token']
            return None
        except Exception as e:
            print(f"Authentication error: {e}")
            return None

    def send_listings(self, listings: List[Listing]) -> bool:
        """Send scraped listings to the API."""
        try:
            listings_data = [vars(listing) for listing in listings]
            response = requests.post(
                f"{self.base_url}/api/scraper/listings",
                headers=self.headers,
                json={'listings': listings_data}
            )
            response.raise_for_status()
            return response.json()['success']
        except Exception as e:
            print(f"Error sending listings: {e}")
            return False

    def update_status(self, 
                     is_active: bool, 
                     total_listings: int,
                     new_listings_today: int,
                     current_progress: float) -> bool:
        """Update the scraper status."""
        try:
            status = {
                'is_active': is_active,
                'last_run': datetime.utcnow().isoformat(),
                'total_listings': total_listings,
                'new_listings_today': new_listings_today,
                'current_progress': current_progress
            }
            response = requests.post(
                f"{self.base_url}/api/scraper/status",
                headers=self.headers,
                json={'status': status}
            )
            response.raise_for_status()
            return response.json()['success']
        except Exception as e:
            print(f"Error updating status: {e}")
            return False

