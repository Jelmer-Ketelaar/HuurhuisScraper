import os

from dotenv import load_dotenv
from twilio.rest import Client

# Laad de .env-variabelen
load_dotenv()


def send_notification(conn, title, price, location, link, source):
    # Controleer of de woning al een notificatie heeft ontvangen
    cur = conn.cursor()
    try:
        cur.execute("SELECT notified FROM rental_listings WHERE link = %s;", (link,))
        result = cur.fetchone()

        if result is None or result[0] == False:  # Als de woning niet bestaat of notified False is
            # Twilio account SID en Auth Token uit het .env-bestand
            account_sid = os.getenv('TWILIO_ACCOUNT_SID')
            auth_token = os.getenv('TWILIO_AUTH_TOKEN')

            # Maak een Twilio client
            client = Client(account_sid, auth_token)

            # Verstuur het WhatsApp-bericht
            message = client.messages.create(
                from_='whatsapp:+14155238886',
                body=f"Nieuwe Huurwoning Gevonden op {source}: {title}\nPrijs: €{price}\nLocatie: {location}\nLink: {link}",
                to='whatsapp:' + os.getenv('MY_PHONE_NUMBER')
            )

            print(f"WhatsApp bericht verzonden: {message.sid}")

            # Update de database om aan te geven dat de notificatie is verstuurd
            cur.execute("UPDATE rental_listings SET notified = TRUE WHERE link = %s;", (link,))
            conn.commit()

        else:
            print(f"Notificatie al verstuurd voor: {title}")

    except Error as e:
        print(f"Fout bij het verwerken van de notificatie: {e}")

    finally:
        cur.close()
