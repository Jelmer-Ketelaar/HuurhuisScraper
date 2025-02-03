"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Home, Settings, Search, AlertCircle } from "lucide-react"

const adminLinks = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Gebruikers",
    href: "/admin/gebruikers",
    icon: Users,
  },
  {
    title: "Woningen",
    href: "/admin/woningen",
    icon: Home,
  },
  {
    title: "Zoekopdrachten",
    href: "/admin/zoekopdrachten",
    icon: Search,
  },
  {
    title: "Meldingen",
    href: "/admin/meldingen",
    icon: AlertCircle,
  },
  {
    title: "Instellingen",
    href: "/admin/instellingen",
    icon: Settings,
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1">
      {adminLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
            pathname === link.href
              ? "text-orange-600 bg-orange-50"
              : "text-gray-700 hover:text-orange-600 hover:bg-orange-50",
          )}
        >
          <link.icon className="w-4 h-4 mr-2" />
          {link.title}
        </Link>
      ))}
    </nav>
  )
}

