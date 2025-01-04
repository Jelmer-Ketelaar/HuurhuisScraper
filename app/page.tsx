import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Search, Bell, TrendingUp, HomeIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-white rounded-lg shadow-xl">
        <h1 className="text-5xl font-bold text-orange-600 mb-6">Welkom bij Huurhuis Scraper</h1>
        <p className="text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">Ontdek jouw perfecte huurwoning in Nederland met realtime updates en slimme zoekopdrachten.</p>
        <Link href="/zoeken">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
            Start met Zoeken
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-600 flex items-center">
              <Search className="mr-3 h-8 w-8 text-teal-600" />
              Slim Zoeken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">Gebruik onze geavanceerde filters om precies te vinden wat je zoekt in je nieuwe thuis.</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-600 flex items-center">
              <Bell className="mr-3 h-8 w-8 text-teal-600" />
              Realtime Meldingen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">Ontvang direct meldingen wanneer nieuwe woningen beschikbaar komen die aan jouw criteria voldoen.</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-600 flex items-center">
              <TrendingUp className="mr-3 h-8 w-8 text-teal-600" />
              Marktinzichten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">Blijf op de hoogte met actuele statistieken en trends in de Nederlandse huurmarkt.</CardDescription>
          </CardContent>
        </Card>
      </div>

      <section className="text-center py-16 bg-gradient-to-r from-orange-100 to-teal-100 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Klaar om je nieuwe thuis te vinden?</h2>
        <Link href="/zoeken">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
            Bekijk Huurwoningen
            <HomeIcon className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </section>
    </div>
  )
}

