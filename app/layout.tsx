import { Inter } from 'next/font/google'
import { Bell, Home, Settings, Activity, Search, Info } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HuisVinder - Vind Jouw Perfecte Huurwoning in Nederland',
  description: 'Zoek en filter eenvoudig huurwoningen in heel Nederland met realtime updates en aanpasbare meldingen.',
  keywords: 'huur, woning, Nederland, Amsterdam, zoeker, vastgoed',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={`${inter.className} bg-gradient-to-br from-orange-50 to-teal-50 min-h-screen`}>
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white shadow-lg">
            {/* <div className="p-6 bg-gradient-to-r from-orange-500 to-teal-600">
              <h1 className="text-2xl font-bold text-white">HuisVinder</h1>
            </div> */}
            <nav className="p-6 space-y-2">
              {[
                { href: "/", icon: Home, label: "Home" },
                { href: "/zoeken", icon: Search, label: "Huurwoningen" },
                { href: "/meldingen", icon: Bell, label: "Meldingen" },
                { href: "/scraper-status", icon: Activity, label: "Zoeker Status" },
                { href: "/settings", icon: Settings, label: "Instellingen" },
                { href: "/over-ons", icon: Info, label: "Over Ons" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5 mr-3 text-teal-600" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'
