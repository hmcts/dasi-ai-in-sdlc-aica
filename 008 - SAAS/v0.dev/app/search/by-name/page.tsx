"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocale } from "@/lib/hooks"
import { getTranslation } from "@/lib/i18n"
import { Header, Footer, BackLink } from "@/components/layout/header-footer"

export default function SearchByName() {
  const router = useRouter()
  const [locale, changeLocale] = useLocale()
  const t = (key: string) => getTranslation(locale, key)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get("q") as string

    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}&lang=${locale}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} changeLocale={changeLocale} />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        <BackLink href={`/search-options?lang=${locale}`} locale={locale} />

        <h2 className="text-3xl font-bold mb-8">{t("page.home.title")}</h2>

        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="mb-6">
              <label htmlFor="search" className="block text-lg font-bold mb-2">
                {t("page.search-options.yes")}
              </label>
              <div className="flex">
                <Input
                  type="text"
                  id="search"
                  name="q"
                  className="rounded-r-none border-2 border-black h-12 text-lg"
                  required
                />
                <Button type="submit" className="rounded-l-none bg-green-600 hover:bg-green-700 h-12 px-6">
                  {t("common.continue")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  )
}

