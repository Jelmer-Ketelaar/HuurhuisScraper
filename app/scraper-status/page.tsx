"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ScraperStatus() {
  const [status, setStatus] = useState({
    isActive: false,
    totalListings: 0,
    newListingsToday: 0,
    currentProgress: 0,
  })

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/scraper/status", {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_SCRAPER_API_KEY as string,
        },
      })
      const data = await response.json()
      if (data.success) {
        setStatus((prevStatus) => ({
          ...prevStatus,
          totalListings: data.data.total_listings,
          newListingsToday: data.data.new_listings_today,
          currentProgress: data.data.current_progress, // Added currentProgress
        }))
      }
    } catch (error) {
      console.error("Error fetching scraper status:", error)
    }
  }

  const toggleScraper = async () => {
    try {
      const response = await fetch("/api/scraper/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SCRAPER_API_KEY as string,
        },
        body: JSON.stringify({
          city: "Amsterdam",
          rent_min: 500,
          rent_max: 2000,
          neighborhood: "",
          home_type: "",
        }),
      })
      const data = await response.json()
      if (data.success) {
        setStatus((prevStatus) => ({ ...prevStatus, isActive: !prevStatus.isActive }))
      }
    } catch (error) {
      console.error("Error toggling scraper:", error)
    }
  }

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [fetchStatus]) // Added fetchStatus to dependencies

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Scraper Status</h1>
          <p className="text-gray-600">Monitor and control the scraping process</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <Switch id="scraper-active" checked={status.isActive} onCheckedChange={toggleScraper} />
            <Label htmlFor="scraper-active" className="text-gray-700">
              Active
            </Label>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={fetchStatus}>
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
            <div className="text-3xl font-bold text-purple-600">{status.totalListings}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800">Today's Listings</CardTitle>
            <CardDescription>New listings found today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{status.newListingsToday}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800">Scraper Status</CardTitle>
            <CardDescription>Current operation status</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className={status.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {status.isActive ? "Active" : "Inactive"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800">Current Scraping Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={status.currentProgress} className="w-full" />
          <p className="mt-2 text-sm text-gray-600">{status.currentProgress}% complete</p>
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
                <Badge variant="outline" className="text-purple-600 border-purple-300">
                  2 min ago
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

