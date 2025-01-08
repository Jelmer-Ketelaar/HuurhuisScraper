'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Settings</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800">Scraper Configuration</CardTitle>
          <CardDescription>Customize how the scraper behaves</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scrape-interval" className="text-blue-600">Scrape Interval (minutes)</Label>
            <Input id="scrape-interval" type="number" placeholder="30" className="border-blue-300 focus:border-blue-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-listings" className="text-blue-600">Maximum Listings per Scrape</Label>
            <Input id="max-listings" type="number" placeholder="100" className="border-blue-300 focus:border-blue-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-sites" className="text-blue-600">Target Websites</Label>
            <Select>
              <SelectTrigger id="target-sites" className="border-blue-300 focus:border-blue-500">
                <SelectValue placeholder="Select sites to scrape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="funda">Funda</SelectItem><SelectItem value="funda">Funda</SelectItem>
                <SelectItem value="pararius">Pararius</SelectItem>
                <SelectItem value="kamernet">Kamernet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800">Notification Settings</CardTitle>
          <CardDescription>Manage your alert preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-blue-600">Enable Notifications</Label>
            <Switch id="notifications" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-600">Notification Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" className="border-blue-300 focus:border-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800">Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language" className="text-blue-600">Language</Label>
            <Select>
              <SelectTrigger id="language" className="border-blue-300 focus:border-blue-500">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="nl">Dutch</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">Save Settings</Button>
    </div>
  )
}

