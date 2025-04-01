import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function SearchByType() {
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

        <h2 className="text-3xl font-bold mb-8">Find a court or tribunal by type of case</h2>

        <div className="max-w-2xl">
          <form action="/search" className="mb-12">
            <div className="mb-6">
              <Label htmlFor="case-type" className="block text-lg font-bold mb-2">
                Select a type of case
              </Label>
              <div className="mb-4">
                <Select name="case-type">
                  <SelectTrigger id="case-type" className="border-2 border-black h-12 text-lg">
                    <SelectValue placeholder="Choose a case type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adoption">Adoption</SelectItem>
                    <SelectItem value="bankruptcy">Bankruptcy</SelectItem>
                    <SelectItem value="children">Children</SelectItem>
                    <SelectItem value="civil">Civil partnership</SelectItem>
                    <SelectItem value="crime">Crime</SelectItem>
                    <SelectItem value="divorce">Divorce</SelectItem>
                    <SelectItem value="domestic">Domestic violence</SelectItem>
                    <SelectItem value="housing">Housing possession</SelectItem>
                    <SelectItem value="money">Money claims</SelectItem>
                    <SelectItem value="probate">Probate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 h-12 px-6">
                Continue
              </Button>
            </div>
          </form>
        </div>
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

