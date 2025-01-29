import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function Prijzen() {
  const plans = [
    {
      name: "Basis",
      price: "0",
      description: "Perfect om te beginnen met zoeken",
      features: [
        "Dagelijkse zoekopdrachten",
        "Basis e-mailmeldingen",
        "Toegang tot alle openbare listings",
        "Basis zoekfilters",
      ],
      button: "Start Gratis",
      href: "/registreren",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "14,99",
      description: "Voor serieuze woningzoekers",
      features: [
        "Real-time zoekopdrachten",
        "Directe push-notificaties",
        "Geavanceerde filters",
        "Prioriteit in zoekresultaten",
        "Exclusieve listings",
        "24/7 ondersteuning",
      ],
      button: "Ga Premium",
      href: "/registreren?plan=premium",
      highlighted: true,
    },
    {
      name: "Zakelijk",
      price: "49,99",
      description: "Voor makelaars en vastgoedbedrijven",
      features: [
        "Alle Premium features",
        "API-toegang",
        "Meerdere gebruikers",
        "Aangepaste rapportages",
        "Dedicated accountmanager",
        "White-label oplossing",
      ],
      button: "Neem Contact Op",
      href: "/contact",
      highlighted: false,
    },
  ]

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">Transparante Prijzen</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Kies het plan dat bij je past. Geen verborgen kosten, op elk moment opzegbaar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              plan.highlighted ? "border-2 border-orange-500 shadow-xl scale-105" : "border border-gray-200"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Meest gekozen
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-teal-600">{plan.name}</CardTitle>
              <CardDescription className="text-center">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <span className="text-4xl font-bold">€{plan.price}</span>
                <span className="text-gray-600">/maand</span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href={plan.href} className="w-full">
                <Button
                  className={`w-full ${
                    plan.highlighted ? "bg-orange-500 hover:bg-orange-600" : "bg-teal-600 hover:bg-teal-700"
                  }`}
                >
                  {plan.button}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Veel Gestelde Vragen</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          {[
            {
              q: "Kan ik op elk moment opzeggen?",
              a: "Ja, je kunt je abonnement op elk moment opzeggen. Je behoudt toegang tot het einde van je betaalperiode.",
            },
            {
              q: "Is er een gratis proefperiode?",
              a: "Ja, je kunt altijd beginnen met ons gratis Basis plan om de service te testen.",
            },
            {
              q: "Hoe snel krijg ik meldingen?",
              a: "Premium gebruikers ontvangen real-time meldingen zodra er nieuwe woningen beschikbaar komen die aan hun criteria voldoen.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-600">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

