"use client"

import Link from "next/link"
import { useLocale } from "@/lib/hooks"
import { getTranslation } from "@/lib/i18n"
import { Header, Footer } from "@/components/layout/header-footer"

export default function Home() {
  const [locale, changeLocale] = useLocale()
  const t = (key: string) => getTranslation(locale, key)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} changeLocale={changeLocale} />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-8">{t("page.home.title")}</h2>

          <p className="text-lg mb-6">{t("page.home.description")}</p>

          <ul className="list-disc pl-8 mb-8 space-y-2">
            <li>{t("page.home.list.item1")}</li>
            <li>{t("page.home.list.item2")}</li>
            <li>{t("page.home.list.item3")}</li>
            <li>{t("page.home.list.item4")}</li>
            <li>{t("page.home.list.item5")}</li>
          </ul>

          <Link
            href={`/search-options?lang=${locale}`}
            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 text-lg mb-12"
          >
            {t("page.home.start")}
          </Link>

          <div className="border-t border-gray-300 pt-8">
            <h2 className="text-2xl font-bold mb-4">{t("page.home.before")}</h2>

            <p className="mb-4">{t("page.home.welsh")}</p>

            <p className="mb-4">{t("page.home.northern")}</p>

            <p className="mb-4">{t("page.home.fees")}</p>

            <p className="mb-4">{t("page.home.scotland")}</p>

            <ul className="list-disc pl-8 mb-4 space-y-2">
              <li>{t("page.home.scotland.item1")}</li>
              <li>{t("page.home.scotland.item2")}</li>
              <li>{t("page.home.scotland.item3")}</li>
            </ul>

            <p className="mb-4">{t("page.home.scotland.contact")}</p>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  )
}

