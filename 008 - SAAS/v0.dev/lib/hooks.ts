"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { Locale } from "./i18n"

// Custom hook to manage locale
export function useLocale(): [Locale, (newLocale: Locale) => void] {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get locale from URL or default to English
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const urlLocale = searchParams.get("lang") as Locale
    if (urlLocale && (urlLocale === "en" || urlLocale === "cy")) {
      setLocaleState(urlLocale)
    }
  }, [searchParams])

  // Function to change locale
  const changeLocale = (newLocale: Locale) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("lang", newLocale)

    // Create new URL with updated locale
    const search = current.toString()
    const query = search ? `?${search}` : ""

    router.push(`${pathname}${query}`)
    setLocaleState(newLocale)
  }

  return [locale, changeLocale]
}

