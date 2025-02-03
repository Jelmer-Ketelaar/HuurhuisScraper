"use client"

import { Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "../contexts/LanguageContext"

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <Select value={language} onValueChange={(value: "nl" | "en") => setLanguage(value)}>
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Taal" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="nl">
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Nederlands
          </div>
        </SelectItem>
        <SelectItem value="en">
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            English
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

