import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Meer HuurhuisScraper</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hoe-werkt-het" className="text-gray-600 hover:text-orange-600">
                  Hoe werkt het
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-600 hover:text-orange-600">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/prijzen" className="text-gray-600 hover:text-orange-600">
                  Prijzen
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-orange-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Volg ons</h3>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" className="text-gray-600 hover:text-orange-600">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://facebook.com" className="text-gray-600 hover:text-orange-600">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Taal</h3>
            <Select defaultValue="nl">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecteer taal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nl">
                  <div className="flex items-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%2012.21.36-70LAOdNvdm7Ag1xUatmigWXQmzM8d7.png"
                      alt="NL"
                      className="w-5 h-5 mr-2"
                    />
                    Nederlands
                  </div>
                </SelectItem>
                <SelectItem value="en">
                  <div className="flex items-center">
                    <img src="/placeholder.svg?height=20&width=20" alt="EN" className="w-5 h-5 mr-2" />
                    English
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; {currentYear} HuurhuisScraper. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}

