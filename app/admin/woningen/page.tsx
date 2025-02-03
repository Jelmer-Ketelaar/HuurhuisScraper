"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminListings() {
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

  const listings = [
    { id: 1, address: "Hoofdstraat 1, Amsterdam", price: 1500, bedrooms: 2 },
    { id: 2, address: "Kerkplein 5, Rotterdam", price: 1200, bedrooms: 1 },
    { id: 3, address: "Zeeweg 10, Den Haag", price: 1800, bedrooms: 3 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Woningen Beheer</h1>

      <Card>
        <CardHeader>
          <CardTitle>Alle Woningen</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Adres</TableHead>
                <TableHead>Prijs (€)</TableHead>
                <TableHead>Slaapkamers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>{listing.address}</TableCell>
                  <TableCell>{listing.price}</TableCell>
                  <TableCell>{listing.bedrooms}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

