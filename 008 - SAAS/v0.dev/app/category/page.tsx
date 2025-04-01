"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useLocale } from "@/lib/hooks"
import { getTranslation } from "@/lib/i18n"
import { Header, Footer, BackLink } from "@/components/layout/header-footer"

export default function Category() {
  const router = useRouter()
  const [locale, changeLocale] = useLocale()
  const t = (key: string) => getTranslation(locale, key)

  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedOption) {
      setError(t("common.error"))
      return
    }

    // Route based on selection
    switch (selectedOption) {
      case "money":
        router.push(`/category/money?lang=${locale}`)
        break
      case "probate":
        router.push(`/category/probate?lang=${locale}`)
        break
      case "childcare":
        router.push(`/category/childcare?lang=${locale}`)
        break
      case "harm":
        router.push(`/category/harm?lang=${locale}`)
        break
      case "immigration":
        router.push(`/category/immigration?lang=${locale}`)
        break
      case "crime":
        router.push(`/category/crime?lang=${locale}`)
        break
      case "highcourt":
        router.push(`/category/highcourt?lang=${locale}`)
        break
      case "notfound":
        router.push(`/not-found?lang=${locale}`)
        break
      default:
        router.push(`/?lang=${locale}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} changeLocale={changeLocale} />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        <BackLink href={`/search-purpose?lang=${locale}`} locale={locale} />

        <div className="max-w-2xl">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">{t("page.category.title")}</h2>

              <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="money" value="money" className="mt-1" />
                    <div>
                      <Label htmlFor="money" className="text-lg font-medium">
                        {t("page.category.money.title")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.category.money.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="probate" value="probate" className="mt-1" />
                    <div>
                      <Label htmlFor="probate" className="text-lg font-medium">
                        {t("page.category.probate.title")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.category.probate.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="childcare" value="childcare" className="mt-1" />
                    <div>
                      <Label htmlFor="childcare" className="text-lg font-medium">
                        {t("page.category.childcare.title")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.category.childcare.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="harm" value="harm" className="mt-1" />
                    <div>
                      <Label htmlFor="harm" className="text-lg font-medium">
                        {t("page.category.harm.title")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.category.harm.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="immigration" value="immigration" className="mt-1" />
                    <div>
                      <Label htmlFor="immigration" className="text-lg font-medium">
                        {t("page.category.immigration.title")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.category.immigration.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="crime" value="crime" className="mt-1" />
                    <div>
                      <Label htmlFor="crime" className="text-lg font-medium">
                        {t("page.category.crime.title")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.category.crime.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="highcourt" value="highcourt" className="mt-1" />
                    <div>
                      <Label htmlFor="highcourt" className="text-lg font-medium">
                        {t("page.category.highcourt.title")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.category.highcourt.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="notfound" value="notfound" className="mt-1" />
                    <div>
                      <Label htmlFor="notfound" className="text-lg font-medium">
                        {t("page.category.notfound")}
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>
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

