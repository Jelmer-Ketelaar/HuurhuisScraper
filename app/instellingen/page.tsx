import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Settings } from 'lucide-react'

export default function Instellingen() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Instellingen</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-600 flex items-center">
            <Settings className="w-6 h-6 mr-2" />
            Algemene Instellingen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mailadres voor meldingen</Label>
            <Input id="email" type="email" placeholder="uw@email.nl" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="notifications" />
            <Label htmlFor="notifications">E-mailmeldingen inschakelen</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="search-frequency">Zoekfrequentie (in minuten)</Label>
            <Input id="search-frequency" type="number" placeholder="30" />
          </div>
          <Button className="w-full bg-teal-600 hover:bg-teal-700">Instellingen Opslaan</Button>
        </CardContent>
      </Card>
    </div>
  )
}

