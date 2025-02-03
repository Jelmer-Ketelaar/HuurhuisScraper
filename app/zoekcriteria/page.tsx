"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"
import dynamic from "next/dynamic"

// Import map component dynamically to avoid SSR issues
const Map = dynamic(() => import("../components/Map"), { ssr: false })

const cities = {
  amsterdam: {
    name: "Amsterdam",
    center: { lat: 52.3676, lng: 4.9041 },
    neighborhoods: {
      "Amsterdam Centrum": [
        "Burgwallen-Oude Zijde",
        "Burgwallen-Nieuwe Zijde",
        "Grachtengordel-West",
        "Grachtengordel-Zuid",
        "Nieuwmarkt/Lastage",
        "Haarlemmerbuurt",
        "Jordaan",
        "Weteringschans",
      ],
      "Amsterdam Zuid": [
        "De Pijp",
        "Museumkwartier",
        "Willemspark",
        "Apollobuurt",
        "Stadionbuurt",
        "Schinkelbuurt",
        "Buitenveldert-West",
        "Buitenveldert-Oost",
      ],
      "Amsterdam West": [
        "Oud-West/De Baarsjes",
        "Westerpark",
        "Bos en Lommer",
        "Geuzenveld",
        "Slotermeer",
        "Slotervaart",
      ],
      // Add more neighborhoods...
    },
  },
  rotterdam: {
    name: "Rotterdam",
    center: { lat: 51.9244, lng: 4.4777 },
    neighborhoods: {
      "Rotterdam Centrum": ["Stadsdriehoek", "Cool", "Oude Westen", "Dijkzigt", "Nieuwe Werk", "Scheepvaartkwartier"],
      "Rotterdam Noord": ["Oude Noorden", "Agniesebuurt", "Provenierswijk", "Bergpolder", "Liskwartier", "Blijdorp"],
      // Add more neighborhoods...
    },
  },
  // Add more cities...
}

export default function Zoekcriteria() {
  const [city, setCity] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [area, setArea] = useState("")
  const [priceRange, setPriceRange] = useState([500, 2500])
  const [radius, setRadius] = useState(5)
  const [mapCenter, setMapCenter] = useState({ lat: 52.3676, lng: 4.9041 })

  useEffect(() => {
    if (city && cities[city as keyof typeof cities]) {
      setMapCenter(cities[city as keyof typeof cities].center)
    }
  }, [city])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search criteria submitted", { city, neighborhood, area, priceRange, radius })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-orange-600 text-center mb-8">Zoekcriteria</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg border-orange-200 border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-600 flex items-center">
              <Search className="w-6 h-6 mr-2" />
              Specificeer je Zoekopdracht
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-teal-600">Stad</Label>
                  <Select onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kies een stad" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(cities).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {city && (
                  <div className="space-y-2">
                    <Label className="text-teal-600">Wijk</Label>
                    <Select onValueChange={setNeighborhood}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kies een wijk" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(cities[city as keyof typeof cities].neighborhoods).map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {city && neighborhood && (
                  <div className="space-y-2">
                    <Label className="text-teal-600">Buurt</Label>
                    <Select onValueChange={setArea}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kies een buurt" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities[city as keyof typeof cities].neighborhoods[neighborhood].map((a) => (
                          <SelectItem key={a} value={a}>
                            {a}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-teal-600">Prijsbereik</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-24"
                    />
                    <span>tot</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="grid grid-cols-2 gap-2">
                    {["Huisdieren toegestaan", "Gemeubileerd", "Balkon/terras", "Parkeergelegenheid", "Lift"].map(
                      (option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox id={option} />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-teal-600">Maximale afstand tot centrum (km)</Label>
                  <Input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="border-teal-300 focus:border-teal-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Zoeken Starten
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
          <Map center={mapCenter} radius={radius} />
        </div>
      </div>
    </div>
  )
}

