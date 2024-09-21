# HuurhuisScraper

HuurhuisScraper is een Python-gebaseerde tool die huurwoningvermeldingen scrapt van verschillende websites en deze in
een MySQL-database opslaat. De tool verstuurt notificaties via WhatsApp wanneer nieuwe woningen worden gevonden die
voldoen aan de ingestelde criteria.

## Inhoudsopgave

- [Installatie](#installatie)
- [Vereisten](#vereisten)
- [Configuratie](#configuratie)
- [Gebruik](#gebruik)
- [Functionaliteiten](#functionaliteiten)
- [Toekomstige uitbreidingen](#toekomstige-uitbreidingen)

## Installatie

1. Clone de repository naar je lokale machine:
   ```bash
   git clone `https://github.com/jelmer-ketelaar/huurhuisscraper.git`
   ```
2. Ga naar de directory van het project:
   ```bash
    cd huurhuisscraper
   ```

3. Installeer de benodigde packages:
   ```bash
    pip install -r requirements.txt
    ```

Zorg ervoor dat je MySQL op je machine hebt geïnstalleerd of gebruik een externe MySQL-server om de database te hosten.

## Vereisten

Je hebt de volgende software nodig om dit project te draaien:

- **Python 3.8+**: Zorg ervoor dat Python 3.8 of hoger is geïnstalleerd op je systeem.
- **pip**: Python package manager om benodigde libraries te installeren.
- **MySQL** (of MariaDB): Voor database opslag van de huurwoningvermeldingen.
- **Twilio-account**: Voor het versturen van WhatsApp-notificaties.

### Python-pakketten:

De volgende pakketten zijn nodig voor dit project en worden automatisch geïnstalleerd via het `requirements.txt`
bestand:

- `requests`: Voor HTTP-verzoeken naar websites.
- `beautifulsoup4`: Voor het parsen van HTML-content tijdens het scrapen.
- `fake-useragent`: Voor het dynamisch genereren van `User-Agent` headers in verzoeken.
- `mysql-connector-python`: Voor MySQL databaseverbindingen.
- `twilio`: Voor het versturen van WhatsApp-notificaties via de Twilio API.
- `python-dotenv`: Voor het beheren van omgevingsvariabelen vanuit een `.env` bestand.
- `flake8`: Voor linting en het controleren van de codekwaliteit.
- `pytest`: Voor het uitvoeren van unit tests en andere testscenario's.
- `schedule`: Voor het periodiek plannen en uitvoeren van scraping-taken.

## Configuratie

1. Maak een .env-bestand in de root van het project en voeg de volgende omgevingsvariabelen toe:

```TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
MY_PHONE_NUMBER=your_phone_number
```

2. Maak de MySQL-database aan voor het opslaan van de huurwoninggegevens:

```bash
CREATE DATABASE huurwoningen;
USE huurwoningen;

CREATE TABLE rental_listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    price INT,
    location VARCHAR(255),
    link TEXT,
    source VARCHAR(255),
    notified BOOLEAN DEFAULT FALSE
);
```

## Gebruik

1. Start de scraper handmatig of stel een scheduler in om het regelmatig te laten draaien:

```bash
python main.py
```

2. De scraper zoekt naar huurwoningen op basis van de configuratie in de database en stuurt notificaties via WhatsApp
   zodra er nieuwe woningen zijn gevonden.

## Functionaliteiten

- **Web scraping**: Scrapt huurwoningvermeldingen van meerdere websites.
- **Locatievalidatie**: Verifieert of de gevonden woning zich in een specifieke stad bevindt (bijvoorbeeld Dordrecht).
- **Database-opslag**: Slaat de gescrapete woningvermeldingen op in een MySQL-database voor verdere verwerking.
- **WhatsApp-notificaties**: Stuurt automatisch een WhatsApp-bericht via Twilio wanneer er nieuwe woningen voldoen aan
  de ingestelde criteria.

## Toekomstige uitbreidingen

- Ondersteuning voor meer websites om huurwoningen van te scrapen.
- Uitbreidbare en flexibele filters voor nauwkeurigere zoekopdrachten.
- Automatisering via cron jobs of een andere taakplanner.
- Een gebruiksvriendelijke webinterface voor het beheren van zoekopdrachten en resultaten.