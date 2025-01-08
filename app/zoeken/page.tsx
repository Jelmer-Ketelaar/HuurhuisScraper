import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Euro, MapPin, BedDouble, ArrowUpDown, Search } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function Zoeken() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-orange-600 mb-4 md:mb-0">Huurwoningen</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="nieuwste">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sorteer op" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nieuwste">Nieuwste eerst</SelectItem>
              <SelectItem value="prijs-oplopend">Prijs: laag naar hoog</SelectItem>
              <SelectItem value="prijs-aflopend">Prijs: hoog naar laag</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sorteer
          </Button>
        </div>
      </div>

      <Card className="bg-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-600 flex items-center">
            <Search className="w-6 h-6 mr-2 text-teal-600" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-teal-600">Locatie</Label>
              <Input placeholder="Zoek op stad of regio" className="border-teal-300 focus:border-teal-500" />
            </div>
            <div className="space-y-2">
              <Label className="text-teal-600">Prijsbereik</Label>
              <Slider
                defaultValue={[500, 2500]}
                min={0}
                max={5000}
                step={100}
                className="text-orange-500"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>€0</span>
                <span>€5000</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-teal-600">Slaapkamers</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Alle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="huisdieren" />
                <Label htmlFor="huisdieren" className="text-gray-700">Huisdieren toegestaan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="gemeubileerd" />
                <Label htmlFor="gemeubileerd" className="text-gray-700">Gemeubileerd</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="direct-beschikbaar" />
                <Label htmlFor="direct-beschikbaar" className="text-gray-700">Direct beschikbaar</Label>
              </div>
            </div>
          </div>
          <Button className="mt-6 bg-orange-500 hover:bg-orange-600">Filters Toepassen</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader className="p-0">
              <img
                src={`/placeholder.svg?height=200&width=400`}
                alt="Woning"
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <CardTitle className="text-2xl text-orange-600">€1.250/maand</CardTitle>
                <Badge variant="secondary" className="bg-teal-100 text-teal-800">Nieuw</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                  <span>Amsterdam, Nederland</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BedDouble className="w-5 h-5 mr-2 text-teal-600" />
                  <span>2 Slaapkamers</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Euro className="w-5 h-5 mr-2 text-teal-600" />
                  <span>Geen borg vereist</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-teal-600 hover:bg-teal-700">Bekijk Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

