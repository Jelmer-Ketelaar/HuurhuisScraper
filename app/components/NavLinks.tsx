"use client"

import Link from "next/link"
import { Home, Settings, Activity, Info, Filter, LayoutDashboard } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type React from "react"

interface NavLinksProps {
  onLinkClick?: () => void
}

export const NavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => {
  const { user } = useAuth()
  const pathname = usePathname()

  const links = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/zoekcriteria", icon: Filter, label: "Zoekcriteria" },
    ...(user?.isAdmin ? [{ href: "/admin", icon: LayoutDashboard, label: "Admin" }] : []),
    { href: "/zoeker-status", icon: Activity, label: "Zoeker Status" },
    { href: "/instellingen", icon: Settings, label: "Instellingen" },
    { href: "/over-ons", icon: Info, label: "Over Ons" },
  ]

  return (
    <div className="flex md:items-center flex-col md:flex-row md:space-x-1">
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
            pathname === item.href
              ? "text-orange-600 bg-orange-50"
              : "text-gray-700 hover:text-orange-600 hover:bg-orange-50",
            "w-full md:w-auto",
          )}
          onClick={onLinkClick}
        >
          <item.icon className="w-4 h-4 mr-2" />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  )
}

