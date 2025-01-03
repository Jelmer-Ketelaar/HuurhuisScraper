import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Euro, MapPin, BedDouble, ArrowUpDown } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4 md:mb-0">Rental Listings</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-blue-600">Location</Label>
              <Input placeholder="Search by city or area" className="border-blue-300 focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <Label className="text-blue-600">Price Range</Label>
              <Slider
                defaultValue={[500, 2500]}
                min={0}
                max={5000}
                step={100}
                className="text-blue-500"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>€0</span>
                <span>€5000</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-blue-600">Bedrooms</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
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
                <Checkbox id="pets" />
                <Label htmlFor="pets" className="text-gray-700">Pet Friendly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="furnished" />
                <Label htmlFor="furnished" className="text-gray-700">Furnished</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="instant-booking" />
                <Label htmlFor="instant-booking" className="text-gray-700">Instant Booking</Label>
              </div>
            </div>
          </div>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Apply Filters</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="p-0">
              <img
                src={`/placeholder.svg?height=200&width=400`}
                alt="Property"
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl text-blue-800">€1,250/month</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-800">New</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Amsterdam, Netherlands</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BedDouble className="w-4 h-4 mr-2 text-blue-500" />
                  <span>2 Bedrooms</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Euro className="w-4 h-4 mr-2 text-blue-500" />
                  <span>No deposit required</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

