import { Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "../contexts/AuthContext"

const features = [
  { name: "Basis zoekfunctionaliteit", free: true, premium: true },
  { name: "Dagelijkse e-mailupdates", free: true, premium: true },
  { name: "Geavanceerde filters", free: false, premium: true },
  { name: "Realtime meldingen", free: false, premium: true },
  { name: "Buurtspecifieke zoekopties", free: false, premium: true },
  { name: "Marktinzichten en trends", free: false, premium: true },
  { name: "Prioritaire klantenondersteuning", free: false, premium: true },
]

export function TierComparison() {
  const { user, upgradeToPremium } = useAuth()

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Gratis Tier</CardTitle>
          <CardDescription>Basis functionaliteit voor iedereen</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                {feature.free ? (
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <X className="h-5 w-5 text-red-500 mr-2" />
                )}
                {feature.name}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <p className="text-2xl font-bold">€0 / maand</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Premium Tier</CardTitle>
          <CardDescription>Geavanceerde functies voor serieuze zoekers</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                {feature.premium && <Check className="h-5 w-5 text-green-500 mr-2" />}
                {feature.name}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-2xl font-bold">€9.99 / maand</p>
          {user?.tier === "free" ? (
            <Button onClick={upgradeToPremium} className="bg-orange-500 hover:bg-orange-600">
              Upgrade naar Premium
            </Button>
          ) : (
            <Button disabled>Huidige Tier</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

