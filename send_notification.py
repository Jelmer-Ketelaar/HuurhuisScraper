import logging
import os

from dotenv import load_dotenv
from mysql.connector import Error
from twilio.rest import Client

# Laad de .env-variabelen
load_dotenv()

# Configuratie voor logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def send_notification(conn, title, price, location, link, source):
    # Controleer of de woning al een notificatie heeft ontvangen
    cur = conn.cursor()
    try:
        cur.execute("SELECT notified FROM rental_listings WHERE link = %s;", (link,))
        result = cur.fetchone()

        if result is None or not result[0]:  # Als de woning niet bestaat of notified False is
            # Twilio account SID en Auth Token uit het .env-bestand
            account_sid = os.getenv('TWILIO_ACCOUNT_SID')
            auth_token = os.getenv('TWILIO_AUTH_TOKEN')
            phone_number = os.getenv('MY_PHONE_NUMBER')

            if not account_sid or not auth_token or not phone_number:
                logger.error("Twilio account SID, auth token, of telefoonnummer is niet correct ingesteld.")
                return

            try:
                # Maak een Twilio client
                client = Client(account_sid, auth_token)

                # Verstuur het WhatsApp-bericht
                message = client.messages.create(
                    from_='whatsapp:+14155238886',
                    body=f"Nieuwe Huurwoning Gevonden op {source}: {title}\nPrijs: €{price}\nLocatie: {location}\nLink: {link}",
                    to=f'whatsapp:{phone_number}'
                )

                logger.info(f"WhatsApp bericht verzonden: {message.sid}")

                # Update de database om aan te geven dat de notificatie is verstuurd
                cur.execute("UPDATE rental_listings SET notified = TRUE WHERE link = %s;", (link,))
                conn.commit()

            except Exception as e:
                logger.error(f"Fout bij het versturen van WhatsApp-bericht: {e}")

        else:
            logger.info(f"Notificatie al verstuurd voor: {title}")

    except Error as e:
        logger.error(f"Fout bij het verwerken van de notificatie in de database: {e}")

    finally:
        cur.close()
