"use client"

import Link from "next/link"
import { LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "../contexts/AuthContext"

export const AuthButton = () => {
  const { user, logout } = useAuth()

  if (user) {
    return (
      <Button onClick={logout} variant="ghost" className="text-gray-700 hover:text-red-600">
        <LogOut className="w-5 h-5 mr-2" />
        Uitloggen
      </Button>
    )
  } else {
    return (
      <Link href="/login">
        <Button variant="ghost" className="text-gray-700 hover:text-orange-600">
          <LogIn className="w-5 h-5 mr-2" />
          Inloggen
        </Button>
      </Link>
    )
  }
}

