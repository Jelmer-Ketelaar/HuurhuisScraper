"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

export default function Zoeken() {
  const [priceRange, setPriceRange] = useState([500, 2500])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the search criteria to your backend
    console.log("Search criteria submitted")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Zoek Huurwoningen</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-600 flex items-center">
            <Search className="w-6 h-6 mr-2" />
            Zoekcriteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-teal-600">Locatie</Label>
                <Input placeholder="Stad of regio" className="border-teal-300 focus:border-teal-500" />
              </div>
              <div className="space-y-2">
                <Label className="text-teal-600">
                  Prijsbereik (€{priceRange[0]} - €{priceRange[1]})
                </Label>
                <Slider
                  min={0}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="text-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-teal-600">Slaapkamers</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Aantal slaapkamers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-teal-600">Oppervlakte (m²)</Label>
                <Input
                  type="number"
                  placeholder="Minimale oppervlakte"
                  className="border-teal-300 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-teal-600">Extra opties</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="huisdieren" />
                  <Label htmlFor="huisdieren">Huisdieren toegestaan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="gemeubileerd" />
                  <Label htmlFor="gemeubileerd">Gemeubileerd</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="balkon" />
                  <Label htmlFor="balkon">Balkon/terras</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="parkeren" />
                  <Label htmlFor="parkeren">Parkeergelegenheid</Label>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Zoeken Starten
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

