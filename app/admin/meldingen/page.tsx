"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminAlerts() {
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

  const alerts = [
    {
      id: 1,
      user: "Jan Jansen",
      type: "Nieuwe woning",
      message: "Nieuwe woning gevonden in Amsterdam",
      date: "2023-06-01",
    },
    {
      id: 2,
      user: "Piet Pietersen",
      type: "Prijsverlaging",
      message: "Prijs verlaagd voor woning in Rotterdam",
      date: "2023-06-02",
    },
    {
      id: 3,
      user: "Anna de Vries",
      type: "Nieuwe woning",
      message: "Nieuwe woning gevonden in Utrecht",
      date: "2023-06-03",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Meldingen Beheer</h1>

      <Card>
        <CardHeader>
          <CardTitle>Recente Meldingen</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gebruiker</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Bericht</TableHead>
                <TableHead>Datum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.user}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>{alert.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

