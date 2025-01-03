import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from 'lucide-react'

export default function ScraperStatus() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Scraper Status</h1>
          <p className="text-gray-500">Monitor and control the scraping process</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Start
          </Button>
          <Button variant="outline">
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Listings</CardTitle>
            <CardDescription>All time scraped listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Listings</CardTitle>
            <CardDescription>New listings found today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scraper Status</CardTitle>
            <CardDescription>Current operation status</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="success">Active</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest scraper operations and results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <div className="font-medium">Scraping completed</div>
                  <div className="text-sm text-gray-500">Found 15 new listings</div>
                </div>
                <Badge variant="outline">2 min ago</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

