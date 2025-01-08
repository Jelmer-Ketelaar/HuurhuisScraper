import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from 'lucide-react'

export default function Meldingen() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Meldingen</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-600 flex items-center">
            <Bell className="w-6 h-6 mr-2" />
            Recente Meldingen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="border-b pb-2">
              <p className="font-semibold">Nieuwe woning beschikbaar</p>
              <p className="text-sm text-gray-600">Een nieuwe 2-slaapkamer appartement is toegevoegd in Amsterdam.</p>
            </li>
            <li className="border-b pb-2">
              <p className="font-semibold">Prijsverlaging</p>
              <p className="text-sm text-gray-600">De prijs van een woning in Utrecht is verlaagd met €50.</p>
            </li>
            <li>
              <p className="font-semibold">Zoekresultaten bijgewerkt</p>
              <p className="text-sm text-gray-600">Er zijn 5 nieuwe woningen gevonden die aan uw zoekcriteria voldoen.</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

