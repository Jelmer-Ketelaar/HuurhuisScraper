import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from 'lucide-react'

export default function OverOns() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Over Ons</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-600 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            Over HuurhuisScraper
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            HuurhuisScraper is opgericht met als doel het vinden van een huurwoning in Nederland eenvoudiger en efficiënter te maken. Ons geavanceerde zoeksysteem doorzoekt continu verschillende huizenwebsites om de meest recente en relevante huurwoningen voor u te vinden.
          </p>
          <p className="mb-4">
            Ons team bestaat uit enthousiaste professionals met een achtergrond in vastgoed en technologie. We streven ernaar om onze gebruikers de beste ervaring te bieden bij het zoeken naar hun ideale huurwoning.
          </p>
          <p>
            Bij vragen of opmerkingen kunt u altijd contact met ons opnemen via info@huurhuisscraper.nl. We staan klaar om u te helpen bij uw zoektocht naar de perfecte huurwoning!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

