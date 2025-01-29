"use client"

import {useState, useEffect} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Euro, MapPin, BedDouble} from "lucide-react"

interface Listing {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  size: number
  url: string
  source: string
  created_at: string
}

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("")

  const fetchListings = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/listings", {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_SCRAPER_API_KEY as string,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch listings")
      }
      const data = await response.json()
      setListings(data.listings)
    } catch (err) {
      setError("Failed to load listings. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, []) //Added [] to specify dependencies

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(filter.toLowerCase()) ||
      listing.location.toLowerCase().includes(filter.toLowerCase()),
  )

  if (loading) {
    return <div className="text-center mt-8">Loading listings...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Available Listings</h1>

      <div className="mb-4">
        <Label htmlFor="filter">Filter Listings</Label>
        <Input
          id="filter"
          placeholder="Search by title or location"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <img
                src={`/placeholder.svg?height=200&width=400`}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{listing.title}</CardTitle>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Euro className="w-4 h-4 mr-2 text-blue-500"/>
                  <span>{listing.price.toLocaleString("nl-NL", {style: "currency", currency: "EUR"})}/month</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500"/>
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center">
                  <BedDouble className="w-4 h-4 mr-2 text-blue-500"/>
                  <span>{listing.bedrooms} Bedrooms</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Badge variant="secondary">{listing.source}</Badge>
                <Button asChild>
                  <a href={listing.url} target="_blank" rel="noopener noreferrer">
                    View Listing
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center mt-8 text-gray-500">No listings found matching your filter.</div>
      )}
    </div>
  )
}

