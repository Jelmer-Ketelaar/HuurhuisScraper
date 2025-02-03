import { Inter } from "next/font/google"
import Link from "next/link"
import type { Metadata } from "next"
import { AuthProvider } from "./contexts/AuthContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import { NavLinks } from "./components/NavLinks"
import { LanguageSelector } from "./components/LanguageSelector"
import { AuthButton } from "./components/AuthButton"
import { MobileMenu } from "./components/MobileMenu"
import { Footer } from "./components/Footer"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HuurhuisScraper - Vind Jouw Perfecte Huurwoning in Nederland",
  description: "Zoek en filter eenvoudig huurwoningen in heel Nederland met realtime updates en aanpasbare meldingen.",
  keywords: "huur, woning, Nederland, Amsterdam, zoeker, vastgoed",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={`${inter.className} bg-gradient-to-br from-orange-50 to-teal-50 min-h-screen`}>
        <AuthProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <header className="bg-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                  <Link
                    href="/"
                    className="text-3xl font-bold text-orange-600 hover:text-orange-700 transition-colors duration-300"
                  >
                    HuurhuisScraper
                  </Link>
                  <nav className="hidden md:flex space-x-6">
                    <NavLinks />
                  </nav>
                  <div className="hidden md:flex items-center space-x-4">
                    <LanguageSelector />
                    <AuthButton />
                  </div>
                  <MobileMenu />
                </div>
              </header>

              <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

              <Footer />
            </div>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'