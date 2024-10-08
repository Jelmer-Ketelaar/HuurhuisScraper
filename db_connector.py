import mysql.connector
from mysql.connector import Error


def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host='127.0.0.1',
            user='root',
            password='',
            database='huurwoningen'
        )
        if conn.is_connected():
            print("Verbonden met MariaDB")
        return conn
    except Error as e:
        print(f"Error: {e}")
        return None


# Maak één keer verbinding met de database en hergebruik deze verbinding
db_connection = get_db_connection()


def save_listing(conn, title, price, location, link, source):
    if conn is None:
        print("Kon geen verbinding maken met de database")
        return
    cur = conn.cursor()
    try:
        # Zorg ervoor dat de link uniek is door er een unieke sleutel van te maken
        cur.execute("""
            INSERT INTO rental_listings (title, price, location, link, source)
            VALUES (%s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE title=VALUES(title), price=VALUES(price), location=VALUES(location), source=VALUES(source);
        """, (title, price, location, link, source))
        conn.commit()
    except Error as e:
        print(f"Fout bij het opslaan van de vermelding: {e}")
    finally:
        cur.close()

def listing_exists(conn, link):
    if conn is None:
        print("Kon geen verbinding maken met de database")
        return False
    try:
        cur = conn.cursor()
        cur.execute("SELECT 1 FROM rental_listings WHERE link = %s;", (link,))
        exists = cur.fetchone() is not None
        cur.close()
        return exists
    except Error as e:
        print(f"Er ging iets mis bij het controleren van de woning in de database: {e}")
        return False

