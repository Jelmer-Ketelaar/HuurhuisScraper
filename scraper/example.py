from client import HuurhuisScraperClient, Listing
import os
from datetime import datetime

def main():
    # Initialize the client
    client = HuurhuisScraperClient(
        base_url="http://localhost:3000",
        api_key=os.getenv("SCRAPER_API_KEY")
    )

    # Authenticate
    token = client.authenticate()
    if not token:
        print("Authentication failed")
        return

    # Example listing
    listing = Listing(
        id="123",
        title="Modern Apartment in Amsterdam",
        description="Beautiful 2-bedroom apartment in the center",
        price=1500.0,
        location="Amsterdam",
        bedrooms=2,
        size=75.0,
        url="https://example.com/listing/123",
        source="funda",
        available_from=datetime.now().isoformat(),
        images=["https://example.com/image1.jpg"]
    )

    # Send listing
    success = client.send_listings([listing])
    if success:
        print("Listing sent successfully")

    # Update status
    success = client.update_status(
        is_active=True,
        total_listings=100,
        new_listings_today=5,
        current_progress=65.0
    )
    if success:
        print("Status updated successfully")

if __name__ == "__main__":
    main()

