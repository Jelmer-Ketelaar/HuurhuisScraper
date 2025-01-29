import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export default function FAQ() {
  const categories = [
    {
      title: "Algemeen",
      questions: [
        {
          q: "Wat is HuurhuisScraper?",
          a: "HuurhuisScraper is een geavanceerd zoekplatform dat automatisch verschillende huizenwebsites doorzoekt om de beste huurwoningen voor jou te vinden. We verzamelen en analyseren continu nieuwe listings om je direct te informeren over geschikte woningen.",
        },
        {
          q: "Is HuurhuisScraper gratis te gebruiken?",
          a: "Ja, we hebben een gratis basis versie waarmee je kunt beginnen. Voor meer geavanceerde features zoals real-time meldingen en prioriteitstoegang bieden we premium abonnementen aan.",
        },
        {
          q: "Hoe actueel zijn de woningen op jullie platform?",
          a: "Onze scraper werkt 24/7 en actualiseert de listings elke paar minuten. Zodra er een nieuwe woning beschikbaar komt die aan jouw criteria voldoet, word je direct op de hoogte gebracht.",
        },
      ],
    },
    {
      title: "Zoeken & Filters",
      questions: [
        {
          q: "Welke zoekfilters zijn beschikbaar?",
          a: "Je kunt filteren op prijs, locatie, aantal kamers, oppervlakte, beschikbaarheid, type woning, en meer. Premium gebruikers hebben toegang tot extra filters zoals specifieke voorzieningen en kenmerken.",
        },
        {
          q: "Kan ik meerdere zoekprofielen aanmaken?",
          a: "Ja, je kunt verschillende zoekprofielen aanmaken met verschillende criteria. Dit is vooral handig als je in verschillende gebieden of verschillende types woningen zoekt.",
        },
        {
          q: "Hoe stel ik meldingen in?",
          a: "In je account kun je per zoekprofiel instellen hoe je meldingen wilt ontvangen: via e-mail, push-notificaties, of beide. Je kunt ook de frequentie van meldingen aanpassen.",
        },
      ],
    },
    {
      title: "Account & Privacy",
      questions: [
        {
          q: "Hoe veilig zijn mijn gegevens?",
          a: "We nemen privacy zeer serieus en verwerken je gegevens volgens de AVG/GDPR-richtlijnen. We delen nooit persoonlijke informatie met derden zonder je toestemming.",
        },
        {
          q: "Kan ik mijn account op elk moment opzeggen?",
          a: "Ja, je kunt je account en abonnement op elk moment opzeggen. Na opzegging behoud je toegang tot het einde van je betaalperiode.",
        },
        {
          q: "Wat gebeurt er met mijn gegevens als ik mijn account opzeg?",
          a: "Na opzegging worden je persoonlijke gegevens binnen 30 dagen volledig verwijderd uit onze systemen, conform ons privacybeleid.",
        },
      ],
    },
    {
      title: "Technisch",
      questions: [
        {
          q: "Welke websites doorzoekt HuurhuisScraper?",
          a: "We doorzoeken alle grote verhuurwebsites in Nederland, waaronder Funda, Pararius, Kamernet, en vele anderen. We voegen regelmatig nieuwe bronnen toe.",
        },
        {
          q: "Hoe betrouwbaar zijn jullie meldingen?",
          a: "Onze scraper verifieert elke listing voordat deze wordt toegevoegd. We controleren op duplicaten en verwijderen verlopen advertenties direct uit de resultaten.",
        },
        {
          q: "Wat als er technische problemen zijn?",
          a: "Ons support team is 7 dagen per week beschikbaar om je te helpen bij technische problemen. Premium gebruikers hebben prioriteitstoegang tot onze support.",
        },
      ],
    },
  ]

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <HelpCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-orange-600 mb-4">Veelgestelde Vragen</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Vind snel antwoord op je vragen over HuurhuisScraper</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {categories.map((category) => (
          <Card key={category.title} className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-teal-600">{category.title}</CardTitle>
              <CardDescription>Veelgestelde vragen over {category.title.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.questions.map((item) => (
                <div key={item.q} className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-800">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Heb je een andere vraag?{" "}
          <a href="/contact" className="text-teal-600 hover:underline">
            Neem contact met ons op
          </a>
        </p>
      </div>
    </div>
  )
}

