import { Metadata } from "next"

export const metadata: Metadata = {
  title: "HuurhuisScraper - Vind Snel Jouw Ideale Huurwoning in Nederland",
  description:
    "Ontdek de perfecte huurwoning in Nederland met HuurhuisScraper. Realtime updates, slimme zoekopdrachten en persoonlijke meldingen voor appartementen, huizen en kamers in Amsterdam, Rotterdam, Utrecht en heel Nederland.",
  keywords:
    "huurhuis, huurwoning, appartement huren, kamer huren, huis huren, Nederland, Amsterdam, Rotterdam, Utrecht, Den Haag, Eindhoven, Groningen, zoeken, realtime updates, huizenmarkt",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://www.huurhuisscraper.nl",
    siteName: "HuurhuisScraper",
    title: "HuurhuisScraper - Jouw Slimme Zoektocht naar de Perfecte Huurwoning",
    description:
      "Vind snel en eenvoudig jouw ideale huurwoning in Nederland met realtime updates en persoonlijke meldingen.",
    images: [
      {
        url: "https://www.huurhuisscraper.nl/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HuurhuisScraper - Slim Zoeken naar Huurwoningen",
      },
    ],
  },
}