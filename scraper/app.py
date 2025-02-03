import logging
import threading
import time

from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user

from db_connector import get_db_connection
from scrape_with_ai import scrape_with_ai

app = Flask(__name__)

# Voeg een geheime sleutel toe voor sessiebeheer
app.secret_key = 'your_secret_key'

# Maak verbinding met de database
conn = get_db_connection()

# Logging instellen
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configureer Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


# Fetch users from the database
def fetch_users():
    cur = conn.cursor()
    cur.execute("SELECT username, password FROM users")
    user = {row[0]: {'password': row[1]} for row in cur.fetchall()}
    cur.close()
    return user


users = fetch_users()


# Gebruikersmodel
class User(UserMixin):
    def __init__(self, username):
        self.id = username


@login_manager.user_loader
def load_user(username):
    if username in users:
        return User(username)
    return None


# Inlogroute
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = users.get(username)
        if user and user['password'] == password:
            login_user(User(username))
            session['user_id'] = username  # Sla de user_id op in de sessie
            return redirect(url_for('index'))
        else:
            flash('Ongeldige gebruikersnaam of wachtwoord', 'error')
    return render_template('login.html')


# Uitlogroute
@app.route('/logout')
@login_required
def logout():
    logout_user()
    session.pop('user_id', None)  # Verwijder de user_id uit de sessie
    return redirect(url_for('login'))


# Start de scraper in de achtergrond voor gebruikers met filters
def start_scraping_for_users_with_filters():
    while True:
        cur = conn.cursor()
        # Flexibel scraping-interval gebaseerd op gebruikersinstellingen
        cur.execute("""    
            SELECT user_id, city, rent_min, rent_max, neighborhood, home_type 
            FROM user_filters 
            WHERE last_run_time < NOW() - INTERVAL 1 HOUR
        """)
        filters = cur.fetchall()
        cur.close()

        for user_filter in filters:
            user_id, city, rent_min, rent_max, neighborhood, home_type = user_filter
            scrape_with_ai(city, rent_min, rent_max, neighborhood, home_type)

            # Update de tijd van de laatste scraping-run
            cur = conn.cursor()
            cur.execute("UPDATE user_filters SET last_run_time = NOW() WHERE user_id = %s", (user_id,))
            conn.commit()
            cur.close()

        time.sleep(3600)  # Wacht een uur voor de volgende scraping


# Route voor het invoeren van zoekopdrachten en filters
@app.route('/', methods=['GET', 'POST'])
@login_required  # Zorg dat de gebruiker is ingelogd
def index():
    if request.method == 'POST':
        city = request.form['city']
        rent_min = request.form['rent_min']
        rent_max = request.form['rent_max']
        neighborhood = request.form.get('neighborhood')  # Optioneel
        home_type = request.form.get('home_type')  # Optioneel

        # Controleer of user_id aanwezig is in de sessie
        user_id = session.get('user_id')
        if not user_id:
            return redirect('app/page.tsx')

        if not city or not rent_min or not rent_max:
            return redirect('app/page.tsx')

        # Sla filters op in de database
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO user_filters (user_id, city, rent_min, rent_max, neighborhood, home_type, last_run_time)
            VALUES (%s, %s, %s, %s, %s, %s, NOW())
        """, (user_id, city, rent_min, rent_max, neighborhood, home_type))
        conn.commit()
        cur.close()

        # Redirect naar resultatenpagina
        return redirect(url_for('results', city=city))

    return render_template('index.html')


# Pagina voor het tonen van resultaten
@app.route('/results')
@login_required  # Zorg dat de gebruiker is ingelogd
def results():
    city = request.args.get('city')
    cur = conn.cursor()

    cur.execute("SELECT title, price, location, link FROM rental_listings WHERE location LIKE %s", (f'%{city}%',))
    listings = cur.fetchall()
    cur.close()

    return render_template('results.html', listings=listings, city=city)


if __name__ == '__main__':
    # Start scraping thread
    threading.Thread(target=start_scraping_for_users_with_filters, daemon=True).start()
    app.run(debug=True, port=5001)
