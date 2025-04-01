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

export default function Money() {
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

    if (selectedOption === "notfound") {
      router.push(`/not-found?lang=${locale}`)
    } else {
      // For all other options, go to the postcode page
      router.push(`/postcode?lang=${locale}`)
    }
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
              <h2 className="text-2xl font-bold mb-6">{t("page.money.title")}</h2>

              <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="claims" value="claims" className="mt-1" />
                    <div>
                      <Label htmlFor="claims" className="text-lg font-medium">
                        {t("page.money.claims")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.money.claims.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="probate" value="probate" className="mt-1" />
                    <div>
                      <Label htmlFor="probate" className="text-lg font-medium">
                        {t("page.money.probate")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.money.probate.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="housing" value="housing" className="mt-1" />
                    <div>
                      <Label htmlFor="housing" className="text-lg font-medium">
                        {t("page.money.housing")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.money.housing.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="bankruptcy" value="bankruptcy" className="mt-1" />
                    <div>
                      <Label htmlFor="bankruptcy" className="text-lg font-medium">
                        {t("page.money.bankruptcy")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.money.bankruptcy.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="benefits" value="benefits" className="mt-1" />
                    <div>
                      <Label htmlFor="benefits" className="text-lg font-medium">
                        {t("page.money.benefits")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.money.benefits.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="employment" value="employment" className="mt-1" />
                    <div>
                      <Label htmlFor="employment" className="text-lg font-medium">
                        {t("page.money.employment")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.money.employment.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="tax" value="tax" className="mt-1" />
                    <div>
                      <Label htmlFor="tax" className="text-lg font-medium">
                        {t("page.money.tax")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.money.tax.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="sjp" value="sjp" className="mt-1" />
                    <div>
                      <Label htmlFor="sjp" className="text-lg font-medium">
                        {t("page.money.sjp")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.money.sjp.description")}</p>
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

