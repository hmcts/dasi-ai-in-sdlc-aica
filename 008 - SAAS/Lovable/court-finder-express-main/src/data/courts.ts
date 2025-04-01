
export interface Court {
  id: string;
  slug: string;
  name: string;
  address: string[];
  town: string;
  postcode: string;
  phoneNumber: string;
  email: string;
  description: string;
  openingTimes: {
    [key: string]: string;
  };
  areasOfLaw: string[];
  facilities: string[];
  additionalInfo?: string;
  lat: number;
  lon: number;
}

export const courts: Court[] = [
  {
    id: "1",
    slug: "birmingham-civil-and-family-justice-centre",
    name: "Birmingham Civil and Family Justice Centre",
    address: ["Priory Courts", "33 Bull Street"],
    town: "Birmingham",
    postcode: "B4 6DS",
    phoneNumber: "0300 123 1024",
    email: "birmingham.civilandfamily@justice.gov.uk",
    description: "The Birmingham Civil and Family Justice Centre deals with civil and family cases.",
    openingTimes: {
      Monday: "9:00am to 5:00pm",
      Tuesday: "9:00am to 5:00pm",
      Wednesday: "9:00am to 5:00pm",
      Thursday: "9:00am to 5:00pm",
      Friday: "9:00am to 5:00pm",
      Saturday: "Closed",
      Sunday: "Closed"
    },
    areasOfLaw: [
      "Adoption",
      "Bankruptcy",
      "Children",
      "Civil partnerships",
      "Divorce",
      "Domestic violence",
      "Housing possession",
      "Money claims"
    ],
    facilities: [
      "Assistance dogs",
      "Baby changing facility",
      "Hearing loop",
      "Interview room",
      "Public toilets",
      "Waiting room",
      "Wheelchair access"
    ],
    lat: 52.4817,
    lon: -1.8951
  },
  {
    id: "2",
    slug: "manchester-civil-justice-centre",
    name: "Manchester Civil Justice Centre",
    address: ["1 Bridge Street West"],
    town: "Manchester",
    postcode: "M60 9DJ",
    phoneNumber: "0300 123 1056",
    email: "manchester.civiljusticecentre@justice.gov.uk",
    description: "The Manchester Civil Justice Centre is a court building in Manchester. It houses the Manchester County Court and the Family Division of the High Court.",
    openingTimes: {
      Monday: "9:00am to 5:00pm",
      Tuesday: "9:00am to 5:00pm",
      Wednesday: "9:00am to 5:00pm",
      Thursday: "9:00am to 5:00pm",
      Friday: "9:00am to 5:00pm",
      Saturday: "Closed",
      Sunday: "Closed"
    },
    areasOfLaw: [
      "Adoption",
      "Bankruptcy",
      "Children",
      "Civil partnerships",
      "Divorce",
      "Domestic violence",
      "Housing possession",
      "Immigration",
      "Money claims"
    ],
    facilities: [
      "Assistance dogs",
      "Baby changing facility",
      "Hearing loop",
      "Interview room",
      "Public toilets",
      "Waiting room",
      "Wheelchair access",
      "Witness service"
    ],
    lat: 53.4808,
    lon: -2.2426
  },
  {
    id: "3",
    slug: "liverpool-civil-and-family-court",
    name: "Liverpool Civil and Family Court",
    address: ["35 Vernon Street"],
    town: "Liverpool",
    postcode: "L2 2BX",
    phoneNumber: "0300 123 1017",
    email: "liverpool.civilandfamily@justice.gov.uk",
    description: "Liverpool Civil and Family Court hearing centre deals with civil and family cases.",
    openingTimes: {
      Monday: "9:00am to 5:00pm",
      Tuesday: "9:00am to 5:00pm",
      Wednesday: "9:00am to 5:00pm",
      Thursday: "9:00am to 5:00pm",
      Friday: "9:00am to 5:00pm",
      Saturday: "Closed",
      Sunday: "Closed"
    },
    areasOfLaw: [
      "Adoption",
      "Bankruptcy",
      "Children",
      "Civil partnerships",
      "Divorce",
      "Employment",
      "Housing possession",
      "Money claims"
    ],
    facilities: [
      "Assistance dogs",
      "Baby changing facility",
      "Hearing loop",
      "Interview room",
      "Public toilets",
      "Waiting room",
      "Wheelchair access"
    ],
    lat: 53.4084,
    lon: -2.9916
  },
  {
    id: "4",
    slug: "central-london-county-court",
    name: "Central London County Court",
    address: ["Thomas More Building", "Royal Courts of Justice", "Strand"],
    town: "London",
    postcode: "WC2A 2LL",
    phoneNumber: "0300 123 1174",
    email: "centrallondon.countycourt@justice.gov.uk",
    description: "The Central London County Court deals with civil cases.",
    openingTimes: {
      Monday: "10:00am to 4:00pm",
      Tuesday: "10:00am to 4:00pm",
      Wednesday: "10:00am to 4:00pm",
      Thursday: "10:00am to 4:00pm",
      Friday: "10:00am to 4:00pm",
      Saturday: "Closed",
      Sunday: "Closed"
    },
    areasOfLaw: [
      "Bankruptcy",
      "Housing possession",
      "Money claims"
    ],
    facilities: [
      "Assistance dogs",
      "Hearing loop",
      "Interview room",
      "Public toilets",
      "Waiting room",
      "Wheelchair access"
    ],
    additionalInfo: "The counter service is open 10am to 4pm.",
    lat: 51.5141,
    lon: -0.1137
  },
  {
    id: "5",
    slug: "leeds-combined-court-centre",
    name: "Leeds Combined Court Centre",
    address: ["1 Oxford Row"],
    town: "Leeds",
    postcode: "LS1 3BG",
    phoneNumber: "0113 306 2800",
    email: "leeds.combined.court@justice.gov.uk",
    description: "The Leeds Combined Court Centre deals with criminal, civil and family cases.",
    openingTimes: {
      Monday: "9:00am to 5:00pm",
      Tuesday: "9:00am to 5:00pm",
      Wednesday: "9:00am to 5:00pm",
      Thursday: "9:00am to 5:00pm",
      Friday: "9:00am to 5:00pm",
      Saturday: "Closed",
      Sunday: "Closed"
    },
    areasOfLaw: [
      "Adoption",
      "Bankruptcy",
      "Children",
      "Civil partnerships",
      "Crime",
      "Divorce",
      "Domestic violence",
      "Housing possession",
      "Money claims"
    ],
    facilities: [
      "Assistance dogs",
      "Baby changing facility",
      "Hearing loop",
      "Interview room",
      "Public toilets",
      "Waiting room",
      "Wheelchair access",
      "Witness service"
    ],
    lat: 53.8008,
    lon: -1.5491
  }
];

// Function to search courts by location
export const searchCourts = (query: string): Court[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  return courts.filter(court => {
    const town = court.town.toLowerCase();
    const postcode = court.postcode.toLowerCase();
    const name = court.name.toLowerCase();
    
    return (
      town.includes(normalizedQuery) ||
      postcode.includes(normalizedQuery) ||
      name.includes(normalizedQuery)
    );
  });
};

// Function to get court by slug
export const getCourtBySlug = (slug: string): Court | undefined => {
  return courts.find(court => court.slug === slug);
};
