"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminUsers() {
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

  const users = [
    { id: 1, name: "Jan Jansen", email: "jan@example.com", tier: "free" },
    { id: 2, name: "Piet Pietersen", email: "piet@example.com", tier: "premium" },
    { id: 3, name: "Anna de Vries", email: "anna@example.com", tier: "free" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Gebruikers Beheer</h1>

      <Card>
        <CardHeader>
          <CardTitle>Alle Gebruikers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Naam</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.tier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

