"use client"

import Link from "next/link"
import { useLocale } from "@/lib/hooks"
import { getTranslation } from "@/lib/i18n"
import { Header, Footer, BackLink } from "@/components/layout/header-footer"

export default function NotFound() {
  const [locale, changeLocale] = useLocale()
  const t = (key: string) => getTranslation(locale, key)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} changeLocale={changeLocale} />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        <BackLink href={`/category?lang=${locale}`} locale={locale} />

        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">{t("page.notfound.title")}</h2>

          <p className="mb-8">{t("page.notfound.description")}</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">{t("page.notfound.nearest")}</h3>
              <p className="mb-2">{t("page.notfound.nearest.description")}</p>
              <Link href={`/search?lang=${locale}`} className="text-blue-800 hover:text-blue-600 underline">
                {t("page.notfound.nearest")}
              </Link>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">{t("page.notfound.prefix")}</h3>
              <p className="mb-2">{t("page.notfound.prefix.description")}</p>
              <Link href={`/search/list?lang=${locale}`} className="text-blue-800 hover:text-blue-600 underline">
                {t("page.notfound.prefix")}
              </Link>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">{t("page.notfound.fees")}</h3>
              <p className="mb-2">{t("page.notfound.fees.description")}</p>
              <a
                href="https://www.gov.uk/court-fees-what-they-are"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-600 underline"
              >
                {t("page.notfound.fees")}
              </a>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">{t("page.notfound.forms")}</h3>
              <p className="mb-2">{t("page.notfound.forms.description")}</p>
              <a
                href="https://www.gov.uk/government/collections/court-and-tribunal-forms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-600 underline"
              >
                {t("page.notfound.forms")}
              </a>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">{t("page.notfound.all")}</h3>
              <p className="mb-2">{t("page.notfound.all.description")}</p>
              <a
                href="https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service/about/access-and-opening"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-600 underline"
              >
                {t("page.notfound.all")}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  )
}

