import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Search, Bell, TrendingUp, HomeIcon, Star, Users, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center py-20 bg-white rounded-2xl shadow-xl">
        <h1 className="text-5xl font-bold text-orange-600 mb-6">Vind Jouw Droomhuurwoning</h1>
        <p className="text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Ontdek de perfecte huurwoning in Nederland met geavanceerde zoekcriteria en realtime updates.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/zoekcriteria">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Start Zoeken
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/registreren">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50 text-lg px-8 py-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Maak een Account Aan
            </Button>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-600 flex items-center">
              <Search className="mr-3 h-8 w-8 text-teal-600" />
              Geavanceerd Zoeken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">
              Zoek op specifieke buurten, voorzieningen, en meer. Onze filters helpen je de perfecte woning te vinden.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-600 flex items-center">
              <Bell className="mr-3 h-8 w-8 text-teal-600" />
              Realtime Meldingen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">
              Ontvang direct meldingen wanneer er nieuwe woningen beschikbaar komen die aan jouw criteria voldoen.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-600 flex items-center">
              <TrendingUp className="mr-3 h-8 w-8 text-teal-600" />
              Marktinzichten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">
              Krijg toegang tot gedetailleerde marktinzichten en trends in de Nederlandse huurmarkt.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <section className="bg-white rounded-2xl shadow-xl p-12">
        <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">Waarom HuurhuisScraper?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <Shield className="h-10 w-10 text-teal-600 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Betrouwbaar en Veilig</h3>
              <p className="text-gray-600">
                We werken alleen met geverifieerde bronnen en beschermen je persoonlijke gegevens.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Users className="h-10 w-10 text-teal-600 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Grote Gebruikersbasis</h3>
              <p className="text-gray-600">
                Duizenden tevreden gebruikers vinden dagelijks hun droomwoning via ons platform.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Star className="h-10 w-10 text-teal-600 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Uitstekende Service</h3>
              <p className="text-gray-600">
                Ons klantenserviceteam staat 24/7 voor je klaar om je te helpen bij je zoektocht.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <HomeIcon className="h-10 w-10 text-teal-600 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Uitgebreid Aanbod</h3>
              <p className="text-gray-600">
                We scannen continu alle grote verhuurplatforms voor het meest actuele woningaanbod.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-100 to-teal-100 rounded-2xl shadow-xl p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Wat Onze Gebruikers Zeggen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Emma",
              text: "Dankzij HuurhuisScraper vond ik binnen een week mijn droomappartement in Amsterdam!",
            },
            {
              name: "Lars",
              text: "De gedetailleerde zoekfuncties maakten het vinden van een geschikte woning zo veel makkelijker.",
            },
            {
              name: "Sophie",
              text: "De marktinzichten hielpen me enorm bij het bepalen van een realistisch budget voor mijn zoektocht.",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <p className="italic mb-4 text-gray-600">"{testimonial.text}"</p>
                <p className="font-semibold text-right text-orange-600">- {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center py-16 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Klaar om je zoektocht te starten?</h2>
        <Link href="/registreren">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Maak Gratis een Account Aan
            <HomeIcon className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </section>
    </div>
  )
}

