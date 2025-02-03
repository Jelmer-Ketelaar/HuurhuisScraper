"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Home, Search, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
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

  const stats = [
    {
      title: "Totaal Gebruikers",
      value: "1,234",
      icon: Users,
      description: "Actieve gebruikers deze maand",
    },
    {
      title: "Actieve Woningen",
      value: "856",
      icon: Home,
      description: "Beschikbare woningen",
    },
    {
      title: "Zoekopdrachten",
      value: "2,345",
      icon: Search,
      description: "Uitgevoerde zoekopdrachten vandaag",
    },
    {
      title: "Meldingen",
      value: "89",
      icon: AlertCircle,
      description: "Openstaande meldingen",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recente Activiteit</CardTitle>
            <CardDescription>De laatste 5 activiteiten op het platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
                  <div className="flex-1">
                    <p className="text-sm">Nieuwe gebruiker geregistreerd</p>
                    <p className="text-xs text-gray-500">2 minuten geleden</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Systeem Status</CardTitle>
            <CardDescription>Huidige status van het systeem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">API Status</span>
                <span className="text-sm text-green-500">Operationeel</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Status</span>
                <span className="text-sm text-green-500">Operationeel</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Scraper Status</span>
                <span className="text-sm text-green-500">Actief</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cache Status</span>
                <span className="text-sm text-green-500">Operationeel</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

