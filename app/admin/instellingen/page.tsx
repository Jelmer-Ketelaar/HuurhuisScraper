"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminSettings() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/login")
    }
  }, [user, router])

  if (!user?.isAdmin) {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Admin Instellingen</h1>

      <Card>
        <CardHeader>
          <CardTitle>Algemene Instellingen</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Naam</Label>
              <Input id="site-name" defaultValue="HuurhuisScraper" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" defaultValue="admin@huurhuisscraper.nl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scraper-interval">Scraper Interval (minuten)</Label>
              <Input id="scraper-interval" type="number" defaultValue="30" />
            </div>
            <Button type="submit">Instellingen Opslaan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

