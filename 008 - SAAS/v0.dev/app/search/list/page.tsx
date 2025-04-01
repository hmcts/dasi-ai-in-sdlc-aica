"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Court } from "@/lib/types"

// This would normally come from the Java API
const fetchAllCourts = async (): Promise<Court[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Import the mock data directly for this example
  const { mockCourts } = await import("@/lib/api")
  return mockCourts
}

export default function CourtsList() {
  const [courts, setCourts] = useState<Court[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCourts = async () => {
      setLoading(true)
      try {
        const allCourts = await fetchAllCourts()
        // Sort courts alphabetically by name
        allCourts.sort((a, b) => a.name.localeCompare(b.name))
        setCourts(allCourts)
      } catch (error) {
        console.error("Error fetching courts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCourts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black py-2 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <span className="text-white font-bold text-xl">GOV.UK</span>
          </div>
        </div>
      </header>

      <div className="bg-blue-900 py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-2xl md:text-3xl font-bold">Find a court or tribunal</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        <Link href="/" className="flex items-center text-blue-800 hover:text-blue-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="underline">Back</span>
        </Link>

        <h2 className="text-3xl font-bold mb-8">All courts and tribunals</h2>

        {loading ? (
          <p className="text-lg">Loading courts and tribunals...</p>
        ) : (
          <div className="space-y-6">
            <p className="text-lg mb-6">A to Z listing of all courts and tribunals.</p>

            <ul className="space-y-4 mb-12">
              {courts.map((court) => (
                <li key={court.id}>
                  <Link href={`/courts/${court.id}`} className="text-blue-800 hover:text-blue-600 underline">
                    {court.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-300 bg-gray-100 py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3 text-blue-800">
                <li>
                  <Link href="#" className="underline hover:text-blue-600">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="underline hover:text-blue-600">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="underline hover:text-blue-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="underline hover:text-blue-600">
                    Accessibility statement
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-3 text-blue-800">
                <li>
                  <Link href="#" className="underline hover:text-blue-600">
                    Terms and conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="underline hover:text-blue-600">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">About this service</h3>
              <p>This is a demonstration project and not an official government service.</p>
            </div>
          </div>
          <div className="mt-12">
            <p>© Crown copyright</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

