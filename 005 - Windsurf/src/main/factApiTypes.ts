/**
 * Type definitions for the FACT API
 */

// Court types
export interface Court {
  name: string;
  slug: string;
  info?: string;
  open?: boolean;
  inPerson?: boolean;
  accessScheme?: boolean;
  urgent_message?: string;
  dx_number?: string;
  image_file?: string;
  lat?: number;
  lon?: number;
  crown_location_code?: number;
  county_location_code?: number;
  magistrates_location_code?: number;
  areas_of_law?: AreaOfLaw[];
  types?: CourtType[];
  emails?: Email[];
  contacts?: Contact[];
  opening_times?: OpeningTime[];
  application_updates?: ApplicationUpdate[];
  facilities?: Facility[];
  addresses?: Address[];
  gbs?: string;
  dx_number_explanation?: string;
  service_centre?: ServiceCentre;
  additional_links?: AdditionalLink[];
  displayed?: boolean;
  hide_aols?: boolean;
  // Additional fields from ExtraCourtDetail
  directions?: unknown;
  family_location_code?: unknown;
  tribunal_location_code?: unknown;
  service_area?: unknown[];
  common_flag?: unknown;
  region_id?: number;
  // Custom fields for templates
  notInPersonP1?: string;
}

export interface CourtReference {
  slug: string;
  name: string;
}

export interface AreaOfLaw {
  name: string;
  external_link: string;
  display_name?: string;
  display_external_link?: string;
  external_link_desc?: string;
  display_external_link_desc?: string;
  alt_name?: string;
  alt_name_cy?: string;
  external_link_cy?: string;
  display_name_cy?: string;
  display_external_link_cy?: string;
  external_link_desc_cy?: string;
  display_external_link_desc_cy?: string;
}

export interface CourtType {
  name: string;
  display_name?: string;
  display_name_cy?: string;
}

export interface Email {
  address: string;
  description: string;
  explanation: string;
  explanationCy?: string;
}

export interface Contact {
  number: string;
  description: string;
  explanation: string;
  explanationCy?: string;
  in_conjunction?: string;
  in_conjunction_cy?: string;
}

export interface OpeningTime {
  description: string;
  hours: string;
}

export interface ApplicationUpdate {
  type: string;
  email?: string;
  external_link?: string;
  external_link_description?: string;
}

export interface Facility {
  name: string;
  description: string;
  description_cy?: string;
}

export interface Address {
  address_lines: string[];
  postcode: string;
  town: string;
  type: string;
  county?: string;
  description?: string;
  description_cy?: string;
}

export interface ServiceCentre {
  name: string;
  slug: string;
  addresses: Address[];
  emails: Email[];
  contacts: Contact[];
  is_a_service_centre?: boolean;
  intro_paragraph?: string;
  intro_paragraph_cy?: string;
}

export interface AdditionalLink {
  url: string;
  description: string;
}

// Search parameters
export interface CourtSearchParameters {
  q?: string;
}

export interface CourtHistorySearchParameters {
  q?: string;
}

// Response types
export interface CourtSearchResponse {
  courts: Court[];
  total: number;
}

export interface CourtHistorySearchResponse {
  courts: CourtReference[];
}

// This interface represents the additional details returned by the /courts/{slug} endpoint
export interface ExtraCourtDetail {
  directions: unknown;
  image_file?: string;
  lat: number;
  lon: number;
  crown_location_code: unknown;
  county_location_code: unknown;
  magistrates_location_code: unknown;
  family_location_code: unknown;
  tribunal_location_code: unknown;
  areas_of_law: AreaOfLaw[];
  emails: Email[];
  contacts: Contact[];
  application_updates: unknown[];
  facilities: unknown[];
  addresses: Address[];
  gbs: unknown;
  dx_number: unknown[];
  service_area: unknown[];
  additional_links: unknown[];
  common_flag: unknown;
  region_id: number;
  service_centre: {
    is_a_service_centre?: boolean;
    intro_paragraph?: string;
    intro_paragraph_cy?: string;
  };
}
