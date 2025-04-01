"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useLocale } from "@/lib/hooks"
import { getTranslation } from "@/lib/i18n"
import { fetchCourts } from "@/lib/api"
import type { Court } from "@/lib/types"
import { Header, Footer, BackLink } from "@/components/layout/header-footer"
import Link from "next/link"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const isNearest = searchParams.get("nearest") === "true"
  const [locale, changeLocale] = useLocale()
  const t = (key: string, params?: Record<string, string | number>) => getTranslation(locale, key, params)

  const [courts, setCourts] = useState<Court[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCourts = async () => {
      setLoading(true)
      try {
        const results = await fetchCourts(query)

        // If searching for nearest courts, sort them by "distance"
        // In a real app, this would use actual distance calculations
        if (isNearest) {
          // For demo purposes, we'll just randomize the order to simulate distance sorting
          const sortedResults = [...results].sort(() => Math.random() - 0.5)
          setCourts(sortedResults.slice(0, 3)) // Limit to 3 "nearest" courts
        } else {
          setCourts(results)
        }
      } catch (error) {
        console.error("Error fetching courts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCourts()
  }, [query, isNearest])

  const getTitle = () => {
    if (isNearest) {
      return `${t("page.search.nearest")} "${query}"`
    }
    return query ? `${t("page.home.title")} "${query}"` : t("page.home.title")
  }

  const getBackLink = () => {
    if (isNearest) {
      return `/postcode?lang=${locale}`
    }
    return `/search-options?lang=${locale}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} changeLocale={changeLocale} />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        <BackLink href={getBackLink()} locale={locale} />

        <h2 className="text-3xl font-bold mb-8">{getTitle()}</h2>

        {loading ? (
          <p className="text-lg">Loading results...</p>
        ) : courts.length > 0 ? (
          <div className="space-y-6">
            <p className="text-lg mb-6">
              {isNearest
                ? t("page.search.found", { count: courts.length })
                : `We found ${courts.length} courts or tribunals matching your search.`}
            </p>

            <ul className="space-y-8 mb-12">
              {courts.map((court) => (
                <li key={court.id} className="border-b border-gray-300 pb-6">
                  <h3 className="text-xl font-bold mb-2">
                    <Link
                      href={`/courts/${court.id}?lang=${locale}`}
                      className="text-blue-800 hover:text-blue-600 underline"
                    >
                      {court.name}
                    </Link>
                  </h3>
                  <div className="space-y-1">
                    <p>{court.address.street}</p>
                    <p>{court.address.city}</p>
                    <p>{court.address.postcode}</p>
                  </div>
                  {isNearest && (
                    <div className="mt-3">
                      <p className="text-gray-600">
                        {/* In a real app, this would show actual distance */}
                        Approximately {Math.floor(Math.random() * 10) + 1} miles away
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-lg">
              {isNearest ? t("page.search.notfound") : `We couldn't find any courts or tribunals matching "${query}".`}
            </p>
            <p className="mt-2">
              {isNearest ? t("page.search.try.again") : "Try searching again using a different town, city or postcode."}
            </p>
          </div>
        )}
      </main>

      <Footer locale={locale} />
    </div>
  )
}

