"use client"

import { useState } from "react"
import { X, Menu } from "lucide-react"
import { NavLinks } from "./NavLinks"
import { LanguageSelector } from "./LanguageSelector"
import { AuthButton } from "./AuthButton"

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-orange-600">
        <Menu className="w-6 h-6" />
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold text-orange-600">Menu</h2>
            <button onClick={toggleMenu} className="text-gray-700 hover:text-orange-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col p-4 space-y-4">
            <NavLinks onLinkClick={toggleMenu} />
          </nav>
          <div className="mt-auto p-4 border-t">
            <div className="mb-4">
              <LanguageSelector />
            </div>
            <AuthButton />
          </div>
        </div>
      )}
    </>
  )
}

