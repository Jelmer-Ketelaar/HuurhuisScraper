"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-teal-50">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-orange-600">Inloggen bij HuurhuisScraper</CardTitle>
          <CardDescription className="text-center">
            Log in om je zoektocht naar de perfecte huurwoning voort te zetten
          </CardDescription>
        </CardHeader>
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
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Inloggen</Button>
          <div className="text-center text-sm">
            <Link href="/wachtwoord-vergeten" className="text-teal-600 hover:underline">
              Wachtwoord vergeten?
            </Link>
          </div>
          <div className="text-center text-sm">
            Nog geen account?{" "}
            <Link href="/registreren" className="text-teal-600 hover:underline">
              Registreer hier
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

