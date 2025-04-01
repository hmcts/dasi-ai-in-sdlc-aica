"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, Clock } from "lucide-react"
import { useLocale } from "@/lib/hooks"
import { getTranslation } from "@/lib/i18n"
import { fetchCourtById } from "@/lib/api"
import type { Court } from "@/lib/types"
import { Header, Footer, BackLink } from "@/components/layout/header-footer"

export default function CourtDetails({ params }: { params: { id: string } }) {
  const [locale, changeLocale] = useLocale()
  const t = (key: string) => getTranslation(locale, key)

  const [court, setCourt] = useState<Court | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCourt = async () => {
      setLoading(true)
      try {
        const data = await fetchCourtById(params.id)
        setCourt(data)
      } catch (err) {
        setError("Court not found")
        console.error("Error fetching court details:", err)
      } finally {
        setLoading(false)
      }
    }

    loadCourt()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header locale={locale} changeLocale={changeLocale} />

        <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
          <p className="text-lg">Loading court details...</p>
        </main>

        <Footer locale={locale} />
      </div>
    )
  }

  if (error || !court) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header locale={locale} changeLocale={changeLocale} />

        <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
          <BackLink href={`/search?lang=${locale}`} locale={locale} />

          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <p className="text-lg">Court not found. Please try searching again.</p>
          </div>
        </main>

        <Footer locale={locale} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} changeLocale={changeLocale} />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        <BackLink href={`/search?lang=${locale}`} locale={locale} />

        <h2 className="text-3xl font-bold mb-8">{court.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">{t("page.home.list.item2")}</h3>

            <div className="mb-6">
              <h4 className="font-bold mb-2">{t("page.home.list.item1")}</h4>
              <div className="space-y-1">
                <p>{court.address.street}</p>
                <p>{court.address.city}</p>
                <p>{court.address.postcode}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold mb-2">Phone</h4>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href={`tel:${court.phone}`} className="text-blue-800 hover:text-blue-600 underline">
                  {court.phone}
                </a>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold mb-2">Email</h4>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${court.email}`} className="text-blue-800 hover:text-blue-600 underline">
                  {court.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("page.home.list.item3")}</h3>
            <div className="flex items-start mb-4">
              <Clock className="h-4 w-4 mr-2 mt-1" />
              <div>
                <p className="font-bold">Court building open:</p>
                <p>Monday to Friday, 9am to 5pm</p>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 mt-8">Areas of law covered</h3>
            <ul className="list-disc pl-6 space-y-2">
              {court.areasOfLaw.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8">
          <h3 className="text-xl font-bold mb-4">About this court</h3>
          <p className="mb-4">{court.description}</p>

          {court.facilities && court.facilities.length > 0 && (
            <>
              <h4 className="font-bold mt-6 mb-2">Building facilities</h4>
              <ul className="list-disc pl-6 space-y-2">
                {court.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  )
}

