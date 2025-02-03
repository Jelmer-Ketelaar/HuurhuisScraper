"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "nl" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  nl: {
    "search.title": "Zoeken",
    "search.button": "Zoeken Starten",
    // Add more translations
  },
  en: {
    "search.title": "Search",
    "search.button": "Start Search",
    // Add more translations
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("nl")

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.nl] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

