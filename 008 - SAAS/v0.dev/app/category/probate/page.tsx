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

export default function Probate() {
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
              <h2 className="text-2xl font-bold mb-6">{t("page.probate.title")}</h2>

              <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="probate" value="probate" className="mt-1" />
                    <div>
                      <Label htmlFor="probate" className="text-lg font-medium">
                        {t("page.probate.probate")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.probate.probate.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="divorce" value="divorce" className="mt-1" />
                    <div>
                      <Label htmlFor="divorce" className="text-lg font-medium">
                        {t("page.probate.divorce")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.probate.divorce.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="civil" value="civil" className="mt-1" />
                    <div>
                      <Label htmlFor="civil" className="text-lg font-medium">
                        {t("page.probate.civil")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.probate.civil.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="financial" value="financial" className="mt-1" />
                    <div>
                      <Label htmlFor="financial" className="text-lg font-medium">
                        {t("page.probate.financial")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.probate.financial.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <RadioGroupItem id="forced" value="forced" className="mt-1" />
                    <div>
                      <Label htmlFor="forced" className="text-lg font-medium">
                        {t("page.probate.forced")}
                      </Label>
                      <p className="text-gray-600 mt-1">{t("page.probate.forced.description")}</p>
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

