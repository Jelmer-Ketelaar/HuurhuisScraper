"use client"

import { createContext, useContext, useState, useEffect } from "react"

type UserTier = "free" | "premium"

type User = {
  id: string
  email: string
  tier: UserTier
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  upgradeToPremium: () => void
  register: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // This is a mock login. In a real app, you'd validate against a backend.
    const mockUser = {
      id: "1",
      email,
      tier: "free" as UserTier,
      isAdmin: email.includes("admin"), // Simple mock admin check
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const upgradeToPremium = () => {
    if (user) {
      const upgradedUser = { ...user, tier: "premium" as UserTier }
      setUser(upgradedUser)
      localStorage.setItem("user", JSON.stringify(upgradedUser))
    }
  }

  const register = async (email: string, password: string) => {
    // This is a mock registration. In a real app, you'd send this to your backend.
    const newUser = {
      id: Date.now().toString(),
      email,
      tier: "free" as UserTier,
      isAdmin: false,
    }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToPremium, register }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

