"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminSearches() {
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

  const searches = [
    { id: 1, user: "Jan Jansen", location: "Amsterdam", minPrice: 1000, maxPrice: 1500 },
    { id: 2, user: "Piet Pietersen", location: "Rotterdam", minPrice: 800, maxPrice: 1200 },
    { id: 3, user: "Anna de Vries", location: "Utrecht", minPrice: 1200, maxPrice: 1800 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Zoekopdrachten Beheer</h1>

      <Card>
        <CardHeader>
          <CardTitle>Recente Zoekopdrachten</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gebruiker</TableHead>
                <TableHead>Locatie</TableHead>
                <TableHead>Min Prijs (€)</TableHead>
                <TableHead>Max Prijs (€)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searches.map((search) => (
                <TableRow key={search.id}>
                  <TableCell>{search.user}</TableCell>
                  <TableCell>{search.location}</TableCell>
                  <TableCell>{search.minPrice}</TableCell>
                  <TableCell>{search.maxPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

