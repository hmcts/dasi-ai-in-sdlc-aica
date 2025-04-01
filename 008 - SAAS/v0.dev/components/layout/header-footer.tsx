"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"

interface HeaderProps {
  locale: Locale
  changeLocale: (locale: Locale) => void
}

export function Header({ locale, changeLocale }: HeaderProps) {
  const t = (key: string) => getTranslation(locale, key)
  const toggleLocale = () => changeLocale(locale === "en" ? "cy" : "en")

  return (
    <>
      <header className="bg-black py-2 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-xl">GOV.UK</span>
            <button onClick={toggleLocale} className="text-white underline hover:no-underline">
              {t("common.language")}
            </button>
          </div>
        </div>
      </header>

      <div className="bg-blue-900 py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-2xl md:text-3xl font-bold">{t("page.home.title")}</h1>
        </div>
      </div>
    </>
  )
}

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const t = (key: string) => getTranslation(locale, key)

  return (
    <footer className="border-t border-gray-300 bg-gray-100 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{t("common.support")}</h3>
            <ul className="space-y-3 text-blue-800">
              <li>
                <Link href="#" className="underline hover:text-blue-600">
                  {t("common.help")}
                </Link>
              </li>
              <li>
                <Link href="#" className="underline hover:text-blue-600">
                  {t("common.cookies")}
                </Link>
              </li>
              <li>
                <Link href="#" className="underline hover:text-blue-600">
                  {t("common.contact")}
                </Link>
              </li>
              <li>
                <Link href="#" className="underline hover:text-blue-600">
                  {t("common.accessibility")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t("common.legal")}</h3>
            <ul className="space-y-3 text-blue-800">
              <li>
                <Link href="#" className="underline hover:text-blue-600">
                  {t("common.terms")}
                </Link>
              </li>
              <li>
                <Link href="#" className="underline hover:text-blue-600">
                  {t("common.privacy")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t("common.about")}</h3>
            <p>{t("common.about.description")}</p>
          </div>
        </div>
        <div className="mt-12">
          <p>{t("common.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}

interface BackLinkProps {
  href: string
  locale: Locale
}

export function BackLink({ href, locale }: BackLinkProps) {
  const t = (key: string) => getTranslation(locale, key)

  return (
    <Link href={href} className="flex items-center text-blue-800 hover:text-blue-600 mb-6">
      <ArrowLeft className="h-4 w-4 mr-2" />
      <span className="underline">{t("common.back")}</span>
    </Link>
  )
}

