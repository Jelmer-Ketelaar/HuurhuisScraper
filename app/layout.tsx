"use client"

import {useState, useEffect} from "react"
import {Inter} from "next/font/google"
import {
  Bell,
  Home,
  Settings,
  Activity,
  Search,
  Info,
  LogIn,
  Menu,
  X,
  HelpCircle,
  CreditCard,
  List,
} from "lucide-react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {metadata} from "./metadata" // Import metadata from the server-side file
import type React from "react"

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = [
    {href: "/", icon: Home, label: "Home"},
    {href: "/zoeken", icon: Search, label: "Huurwoningen"},
    {href: "/listings", icon: List, label: "Listings"},
    {href: "/prijzen", icon: CreditCard, label: "Prijzen"},
    {href: "/meldingen", icon: Bell, label: "Meldingen"},
    {href: "/zoeker-status", icon: Activity, label: "Zoeker Status"},
    {href: "/instellingen", icon: Settings, label: "Instellingen"},
    {href: "/faq", icon: HelpCircle, label: "FAQ"},
    {href: "/over-ons", icon: Info, label: "Over Ons"},
    {href: "/login", icon: LogIn, label: "Inloggen"},
  ]

  return (
    <html lang="nl">
    <body className={`${inter.className} bg-gradient-to-br from-orange-50 to-teal-50 min-h-screen`}>
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Sluit menu" : "Open menu"}
      >
        {isMenuOpen ? <X className="w-6 h-6 text-teal-600"/> : <Menu className="w-6 h-6 text-teal-600"/>}
      </button>

      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 bg-white shadow-lg">
        <nav className="p-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3 text-teal-600"/>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <nav className="p-6 space-y-2 pt-16">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3 text-teal-600"/>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
    </div>
    </body>
    </html>
  )
}