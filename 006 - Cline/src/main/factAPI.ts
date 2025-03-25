import axios from 'axios';

// Base URL for the fact-api service
const FACT_API_BASE_URL = 'http://localhost:8081';

/**
 * Interface for court reference data returned by the API
 */
interface CourtReference {
  name: string;
  slug: string;
  updated_at?: string;
  displayed?: boolean;
  region?: number;
}

/**
 * Interface for court reference with historical name
 */
interface CourtReferenceWithHistoricalName extends CourtReference {
  historicalName?: string;
}

/**
 * Interface for court address
 */
interface CourtAddress {
  address_lines: string[];
  town: string;
  county: string;
  postcode: string;
  type: string;
}

/**
 * Interface for area of law
 */
interface AreaOfLaw {
  name: string;
  external_link: string;
  display_name?: string;
  display_name_cy?: string;
  display_external_link?: string;
  external_link_desc?: string;
  external_link_desc_cy?: string;
  alt_name?: string;
  alt_name_cy?: string;
}

/**
 * Interface for email
 */
interface Email {
  address: string;
  description: string;
  explanation: string;
  explanation_cy?: string;
}

/**
 * Interface for contact
 */
interface Contact {
  number: string;
  description: string;
  explanation: string;
  explanation_cy?: string;
  in_leaflet?: boolean;
}

/**
 * Interface for detailed court information
 */
interface Court {
  slug: string;
  name: string;
  name_cy?: string;
  info?: string;
  info_cy?: string;
  open?: boolean;
  in_person?: boolean;
  access_scheme?: boolean;
  opening_times?: {
    description: string;
    hours: string;
    description_cy?: string;
  }[];
  common_platform?: boolean;
  urgent_message?: string;
  urgent_message_cy?: string;
  types?: {
    id: number;
    name: string;
    search?: string;
    code?: number;
  }[];
  image_file?: string;
  title?: string;
  notInPersonP1?: string;
  service_centre?: {
    intro_paragraph?: string;
    intro_paragraph_cy?: string;
    is_a_service_centre?: boolean;
    [key: string]: string | number | boolean | object | undefined;
  };
  areas_of_law?: AreaOfLaw[];
  // Additional properties from ExtraCourtDetail
  directions?: unknown;
  lat?: number;
  lon?: number;
  crown_location_code?: unknown;
  county_location_code?: unknown;
  magistrates_location_code?: unknown;
  family_location_code?: unknown;
  tribunal_location_code?: unknown;
  emails?: Email[];
  contacts?: Contact[];
  application_updates?: unknown[];
  facilities?: unknown[];
  addresses?: CourtAddress[];
  gbs?: unknown;
  dx_number?: unknown[];
  service_area?: unknown[];
  additional_links?: unknown[];
  common_flag?: unknown;
  region_id?: number;
}

/**
 * Search for courts by name, address, town or postcode
 * @param query The search query
 * @returns Promise resolving to an array of court references
 */
export async function searchCourts(query: string): Promise<CourtReference[]> {
  try {
    const response = await axios.get(`${FACT_API_BASE_URL}/courts`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching courts:', error);
    throw error;
  }
}

/**
 * Search for courts by historical name
 * @param query The search query for historical court names
 * @returns Promise resolving to court reference with historical name
 */
export async function searchCourtHistory(query: string): Promise<CourtReferenceWithHistoricalName> {
  try {
    const response = await axios.get(`${FACT_API_BASE_URL}/courts/court-history/search`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching court history:', error);
    throw error;
  }
}

/**
 * Get detailed information about a specific court by its slug
 * @param slug The court slug
 * @returns Promise resolving to detailed court information
 */
export async function getCourtBySlug(slug: string): Promise<Court> {
  try {
    const response = await axios.get(`${FACT_API_BASE_URL}/courts/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting court details for slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Factory function to create a configured API client
 * This allows for easier testing and configuration
 * @param baseUrl Optional base URL override
 * @returns Object containing API methods
 */
export function createFactApiClient(baseUrl = FACT_API_BASE_URL): {
  searchCourts: (query: string) => Promise<CourtReference[]>;
  searchCourtHistory: (query: string) => Promise<CourtReferenceWithHistoricalName>;
  getCourtBySlug: (slug: string) => Promise<Court>;
} {
  // Create a new axios instance with the provided base URL
  const apiClient = axios.create({
    baseURL: baseUrl
  });

  return {
    searchCourts: async (query: string) => {
      try {
        const response = await apiClient.get('/courts', {
          params: { q: query },
        });
        return response.data;
      } catch (error) {
        console.error('Error searching courts:', error);
        throw error;
      }
    },
    searchCourtHistory: async (query: string) => {
      try {
        const response = await apiClient.get('/courts/court-history/search', {
          params: { q: query },
        });
        return response.data;
      } catch (error) {
        console.error('Error searching court history:', error);
        throw error;
      }
    },
    getCourtBySlug: async (slug: string) => {
      try {
        const response = await apiClient.get(`/courts/${slug}`);
        return response.data;
      } catch (error) {
        console.error(`Error getting court details for slug ${slug}:`, error);
        throw error;
      }
    },
  };
}

// Default export for the API client
export default createFactApiClient();
