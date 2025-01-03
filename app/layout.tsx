import { Inter } from 'next/font/google'
import { Bell, Home, Settings, Activity } from 'lucide-react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-sm">
            <div className="p-6">
              <h1 className="text-xl font-bold">HuurhuisScraper</h1>
            </div>
            <nav className="px-4 py-2">
              <Link href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
              <Link href="/notifications" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 mr-3" />
                Notifications
              </Link>
              <Link href="/scraper-status" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Activity className="w-5 h-5 mr-3" />
                Scraper Status
              </Link>
              <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'