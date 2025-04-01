import type { Court } from "./types"

// Mock data to simulate a Java API backend
const mockCourts: Court[] = [
  {
    id: "1",
    name: "Birmingham Civil and Family Justice Centre",
    address: {
      street: "Priory Courts, 33 Bull Street",
      city: "Birmingham",
      postcode: "B4 6DS",
    },
    phone: "0300 123 1142",
    email: "birmingham.civil@justice.gov.uk",
    description:
      "Birmingham Civil and Family Justice Centre is a modern court building handling civil and family cases for the West Midlands area.",
    areasOfLaw: [
      "Adoption",
      "Bankruptcy",
      "Children",
      "Civil partnerships",
      "Divorce",
      "Domestic violence",
      "Housing possession",
      "Money claims",
    ],
    facilities: [
      "Assisted hearing facilities",
      "Baby changing facilities",
      "Interview room",
      "Public toilets",
      "Refreshments",
      "Wheelchair access",
    ],
  },
  {
    id: "2",
    name: "Manchester Civil Justice Centre",
    address: {
      street: "1 Bridge Street West",
      city: "Manchester",
      postcode: "M60 9DJ",
    },
    phone: "0300 123 1142",
    email: "manchester.civil@justice.gov.uk",
    description: "Manchester Civil Justice Centre handles civil and family cases for the Greater Manchester area.",
    areasOfLaw: [
      "Adoption",
      "Bankruptcy",
      "Children",
      "Civil partnerships",
      "Divorce",
      "Domestic violence",
      "Housing possession",
      "Money claims",
    ],
    facilities: [
      "Assisted hearing facilities",
      "Baby changing facilities",
      "Interview room",
      "Public toilets",
      "Refreshments",
      "Wheelchair access",
    ],
  },
  {
    id: "3",
    name: "Liverpool Crown Court",
    address: {
      street: "Derby Square",
      city: "Liverpool",
      postcode: "L2 1XA",
    },
    phone: "0300 047 0548",
    email: "liverpool.crown@justice.gov.uk",
    description: "Liverpool Crown Court handles serious criminal cases for the Merseyside area.",
    areasOfLaw: ["Crime", "Appeals against conviction", "Appeals against sentence"],
    facilities: [
      "Assisted hearing facilities",
      "Interview room",
      "Public toilets",
      "Refreshments",
      "Witness service",
      "Wheelchair access",
    ],
  },
  {
    id: "4",
    name: "Leeds Combined Court Centre",
    address: {
      street: "1 Oxford Row",
      city: "Leeds",
      postcode: "LS1 3BG",
    },
    phone: "0113 306 2800",
    email: "leeds.combined.court@justice.gov.uk",
    description: "Leeds Combined Court Centre handles both civil and criminal cases for the West Yorkshire area.",
    areasOfLaw: [
      "Adoption",
      "Bankruptcy",
      "Children",
      "Civil partnerships",
      "Crime",
      "Divorce",
      "Domestic violence",
      "Housing possession",
      "Money claims",
    ],
    facilities: [
      "Assisted hearing facilities",
      "Baby changing facilities",
      "Interview room",
      "Public toilets",
      "Refreshments",
      "Witness service",
      "Wheelchair access",
    ],
  },
  {
    id: "5",
    name: "Bristol Civil and Family Justice Centre",
    address: {
      street: "2 Redcliff Street",
      city: "Bristol",
      postcode: "BS1 6GR",
    },
    phone: "0117 366 4800",
    email: "bristol.civilandfamily@justice.gov.uk",
    description:
      "Bristol Civil and Family Justice Centre handles civil and family cases for the Bristol and surrounding areas.",
    areasOfLaw: [
      "Adoption",
      "Bankruptcy",
      "Children",
      "Civil partnerships",
      "Divorce",
      "Domestic violence",
      "Housing possession",
      "Money claims",
    ],
    facilities: [
      "Assisted hearing facilities",
      "Baby changing facilities",
      "Interview room",
      "Public toilets",
      "Refreshments",
      "Wheelchair access",
    ],
  },
  {
    id: "6",
    name: "Newcastle upon Tyne Combined Court Centre",
    address: {
      street: "The Quayside",
      city: "Newcastle upon Tyne",
      postcode: "NE1 3LA",
    },
    phone: "0191 201 2000",
    email: "newcastle.combined.court@justice.gov.uk",
    description:
      "Newcastle upon Tyne Combined Court Centre handles both civil and criminal cases for the Tyne and Wear area.",
    areasOfLaw: [
      "Adoption",
      "Bankruptcy",
      "Children",
      "Civil partnerships",
      "Crime",
      "Divorce",
      "Domestic violence",
      "Housing possession",
      "Money claims",
    ],
    facilities: [
      "Assisted hearing facilities",
      "Baby changing facilities",
      "Interview room",
      "Public toilets",
      "Refreshments",
      "Witness service",
      "Wheelchair access",
    ],
  },
]

// Simulate API calls with a delay to mimic network requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Simulate a Java API endpoint for searching courts
export async function fetchCourts(query: string): Promise<Court[]> {
  await delay(500) // Simulate network delay

  if (!query) return []

  const normalizedQuery = query.toLowerCase()

  return mockCourts.filter(
    (court) =>
      court.name.toLowerCase().includes(normalizedQuery) ||
      court.address.city.toLowerCase().includes(normalizedQuery) ||
      court.address.postcode.toLowerCase().includes(normalizedQuery),
  )
}

// Simulate a Java API endpoint for getting a court by ID
export async function fetchCourtById(id: string): Promise<Court> {
  await delay(300) // Simulate network delay

  const court = mockCourts.find((court) => court.id === id)

  if (!court) {
    throw new Error("Court not found")
  }

  return court
}

// Simulate a function that would calculate distance between courts and a postcode
// In a real app, this would use geocoding and actual distance calculations
export function sortCourtsByDistance(courts: Court[], postcode: string): Court[] {
  // This is just a mock implementation that randomizes the order
  // In a real app, you would use the postcode to calculate actual distances
  return [...courts].sort(() => Math.random() - 0.5)
}

