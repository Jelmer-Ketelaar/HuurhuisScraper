"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function Registreren() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { register } = useAuth()
  const router = useRouter()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Wachtwoorden komen niet overeen")
      return
    }
    try {
      await register(email, password)
      router.push("/")
    } catch (error) {
      console.error("Registration failed:", error)
      alert("Registratie mislukt. Probeer het opnieuw.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-teal-50">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-orange-600">Registreren bij HuurhuisScraper</CardTitle>
          <CardDescription className="text-center">
            Maak een account aan om je zoektocht naar de perfecte huurwoning te starten
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-teal-600">
                E-mailadres
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="uw@email.nl"
                className="border-teal-300 focus:border-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-teal-600">
                Wachtwoord
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="border-teal-300 focus:border-teal-500 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-teal-600">
                Bevestig Wachtwoord
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="border-teal-300 focus:border-teal-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Registreren
            </Button>
            <div className="text-center text-sm">
              Heb je al een account?{" "}
              <Link href="/login" className="text-teal-600 hover:underline">
                Log hier in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

