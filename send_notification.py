import os
from twilio.rest import Client
from dotenv import load_dotenv

# Laad de .env-variabelen
load_dotenv()

def send_notification(title, price, location, link, source):
    # Twilio account SID en Auth Token uit het .env-bestand
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')

    # Maak een Twilio client
    client = Client(account_sid, auth_token)

    # Verstuur het WhatsApp-bericht
    message = client.messages.create(
        from_='whatsapp:+14155238886',
        body=f"Nieuwe Huurwoning Gevonden op {source}: {title}\nPrijs: €{price}\nLocatie: {location}\nLink: {link}",
        to='whatsapp:+31643517600'
    )

    print(f"WhatsApp bericht verzonden: {message.sid}")

