import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ScraperStatus() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Scraper Status</h1>
          <p className="text-gray-600">Monitor and control the scraping process</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <Switch id="scraper-active" />
            <Label htmlFor="scraper-active" className="text-gray-700">Active</Label>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800">Total Listings</CardTitle>
            <CardDescription>All time scraped listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">1,234</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800">Today's Listings</CardTitle>
            <CardDescription>New listings found today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">42</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800">Scraper Status</CardTitle>
            <CardDescription>Current operation status</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800">Current Scraping Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={65} className="w-full" />
          <p className="mt-2 text-sm text-gray-600">
            65% complete
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800">Recent Activity</CardTitle>
          <CardDescription>Latest scraper operations and results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <div className="font-medium text-gray-800">Scraping completed</div>
                  <div className="text-sm text-gray-600">Found 15 new listings</div>
                </div>
                <Badge variant="outline" className="text-purple-600 border-purple-300">2 min ago</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

