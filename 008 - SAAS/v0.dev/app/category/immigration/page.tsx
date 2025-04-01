"use client"

import { useLocale } from "@/lib/hooks"
import { getTranslation } from "@/lib/i18n"
import { Header, Footer, BackLink } from "@/components/layout/header-footer"

export default function Immigration() {
  const [locale, changeLocale] = useLocale()
  const t = (key: string) => getTranslation(locale, key)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} changeLocale={changeLocale} />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        <BackLink href={`/category?lang=${locale}`} locale={locale} />

        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">{t("page.immigration.title")}</h2>

          <p className="mb-6">{t("page.immigration.description")}</p>

          <div className="border p-6 bg-white rounded-md mb-8">
            <h3 className="text-xl font-bold mb-2">{t("page.immigration.center")}</h3>
            <p>{t("page.immigration.location")}</p>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  )
}

