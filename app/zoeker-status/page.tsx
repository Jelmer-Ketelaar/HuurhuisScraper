"use client"

import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Check, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ZoekerStatus() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-600">Zoeker Status</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-600 flex items-center">
            <Activity className="w-6 h-6 mr-2" />
            Huidige Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <Check className="w-6 h-6 text-green-500 mr-2" />
              <span>Zoeker actief</span>
            </div>
            <div>
              <p className="mb-2">Voortgang huidige zoekopdracht:</p>
              <Progress value={67} className="w-full" />
            </div>
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
              <span>Laatste waarschuwing: Snelheidslimiet bereikt op Funda.nl</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

