"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocale } from "@/lib/hooks"
import { getTranslation } from "@/lib/i18n"
import { Header, Footer, BackLink } from "@/components/layout/header-footer"

export default function HighCourt() {
  const router = useRouter()
  const [locale, changeLocale] = useLocale()
  const t = (key: string) => getTranslation(locale, key)

  const [postcode, setPostcode] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!postcode.trim()) {
      setError(t("common.error"))
      return
    }

    // Redirect to search results with the postcode as query and nearest=true
    router.push(`/search?q=${encodeURIComponent(postcode)}&lang=${locale}&nearest=true`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} changeLocale={changeLocale} />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        <BackLink href={`/category?lang=${locale}`} locale={locale} />

        <div className="max-w-2xl">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">{t("page.highcourt.title")}</h2>

              <p className="mb-6">{t("page.highcourt.description")}</p>

              <div className="mb-6">
                <label htmlFor="postcode" className="block text-lg font-medium mb-2">
                  {t("page.highcourt.postcode")}
                </label>
                <Input
                  id="postcode"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="border-2 border-black h-12 text-lg max-w-xs"
                />
              </div>
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6">
              {t("common.continue")}
            </Button>
          </form>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  )
}

