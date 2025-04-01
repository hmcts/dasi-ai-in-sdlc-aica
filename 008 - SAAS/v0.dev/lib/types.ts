export interface Court {
  id: string
  name: string
  address: {
    street: string
    city: string
    postcode: string
  }
  phone: string
  email: string
  description: string
  areasOfLaw: string[]
  facilities?: string[]
}

