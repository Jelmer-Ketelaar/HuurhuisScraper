import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Search,
  Bell,
  TrendingUp,
  HomeIcon,
  CheckCircle,
  Users,
  Shield,
  Star,
  MessageCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const reviews = [
    {
      name: "Lisa van der Berg",
      avatar: "/placeholder.svg",
      role: "Premium Gebruiker",
      content:
        "Binnen twee weken een appartement gevonden in Amsterdam! De real-time meldingen maken echt het verschil.",
      rating: 5,
    },
    {
      name: "Thomas Bakker",
      avatar: "/placeholder.svg",
      role: "Basis Gebruiker",
      content: "Zelfs met het gratis account heb ik veel meer opties dan bij andere websites. Zeer tevreden!",
      rating: 4,
    },
    {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      role: "Premium Gebruiker",
      content:
        "Als expat was het vinden van een woning een uitdaging, maar dankzij HuurhuisScraper heb ik snel iets gevonden.",
      rating: 5,
    },
  ]

  return (
    <div className="space-y-12 px-4 sm:px-6 lg:px-8">
      <section className="text-center py-16 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 mb-6">Stop met Eindeloos Zoeken</h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto px-6">
          Vind 10x sneller jouw perfecte huurwoning in Nederland met real-time updates en slimme zoekopdrachten.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/zoeken">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-full shadow-lg transition-transform hover:scale-105">
              Start met Zoeken
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
          <Link href="/prijzen">
            <Button
              variant="outline"
              className="text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Bekijk Prijzen
              <Shield className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
        </div>
      </section>

      <div className="text-center mb-8">
        <p className="text-sm text-gray-600">Vertrouwd door duizenden woningzoekers</p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="text-2xl font-bold text-gray-800">4.8/5</span>
          <span className="text-gray-600">(2.136+ reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-orange-600 flex items-center">
              <Search className="mr-3 h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
              Slim Zoeken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base sm:text-lg">
              Doorzoek automatisch meer dan 1.000 websites en vind de perfecte huurwoning die aan al jouw wensen
              voldoet.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-orange-600 flex items-center">
              <Bell className="mr-3 h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
              Realtime Meldingen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base sm:text-lg">
              Ontvang direct meldingen wanneer nieuwe woningen beschikbaar komen die aan jouw criteria voldoen.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-orange-600 flex items-center">
              <TrendingUp className="mr-3 h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
              Marktinzichten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base sm:text-lg">
              Krijg toegang tot exclusieve marktdata en trends om de beste beslissing te maken.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <section className="bg-white rounded-lg shadow-xl p-8 sm:p-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-8 text-center">Wat Gebruikers Zeggen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-gray-50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <CardDescription>{review.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">{review.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-100 to-teal-100 rounded-lg shadow-xl p-8 sm:p-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">Hoe HuurhuisScraper Werkt</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Maak een Account</h3>
            <p className="text-gray-600">Registreer gratis en stel je voorkeuren in voor de perfecte huurwoning.</p>
          </div>
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Bell className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Ontvang Meldingen</h3>
            <p className="text-gray-600">Krijg direct bericht wanneer er nieuwe woningen beschikbaar komen.</p>
          </div>
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <HomeIcon className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Vind je Thuis</h3>
            <p className="text-gray-600">Reageer als eerste op nieuwe woningen en vergroot je kansen.</p>
          </div>
        </div>
      </section>

      <section className="text-center py-16 px-6 sm:px-12 md:px-24 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Klaar om je Zoektocht te Versnellen?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sluit je aan bij duizenden anderen die al hun droomwoning hebben gevonden met HuurhuisScraper.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/registreren">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-full shadow-lg transition-transform hover:scale-105">
              Maak Gratis Account
              <Shield className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
          <Link href="/faq">
            <Button
              variant="outline"
              className="text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Veelgestelde Vragen
              <MessageCircle className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

