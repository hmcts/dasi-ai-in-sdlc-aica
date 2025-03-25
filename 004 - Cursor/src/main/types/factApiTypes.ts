/**
 * TypeScript interfaces for the FACT API
 * Generated from Swagger document at http://localhost:8081/v3/api-docs
 */

/**
 * Main Court interface
 */
export interface Court {
  slug: string;
  name: string;
  name_cy?: string;
  info?: string;
  info_cy?: string;
  open?: boolean;
  in_person?: boolean;
  access_scheme?: boolean;
  opening_times?: OpeningTime[];
  common_platform?: boolean;
  urgent_message?: string;
  urgent_message_cy?: string;
  types?: CourtType[];
}

/**
 * Court type information
 */
export interface CourtType {
  id: number;
  name: string;
  search?: string;
  code?: number;
}

/**
 * Opening time information for courts
 */
export interface OpeningTime {
  description: string;
  hours: string;
  description_cy?: string;
}

/**
 * Image file information
 */
export interface ImageFile {
  image_name: string;
}

/**
 * Court info update request
 */
export interface CourtInfoUpdate {
  courts: string[];
  info: string;
  info_cy?: string;
}

/**
 * Opening type information
 */
export interface OpeningType {
  id: number;
  type: string;
  type_cy?: string;
}

/**
 * Local authority information
 */
export interface LocalAuthority {
  id: number;
  name: string;
}

/**
 * Facility type information
 */
export interface FacilityType {
  id: number;
  name: string;
  nameCy?: string;
  image?: string;
  imageDescription?: string;
  imageFilePath?: string;
  order?: number;
}

/**
 * Court history information
 */
export interface CourtHistory {
  id: number;
  search_court_id: number;
  court_name: string;
  updated_at: string; // date-time
  created_at: string; // date-time
  court_name_cy?: string;
}

/**
 * Court general information
 */
export interface CourtGeneralInfo {
  name: string;
  open?: boolean;
  info?: string;
  alert?: string;
  in_person?: boolean;
  access_scheme?: boolean;
  info_cy?: string;
  alert_cy?: string;
  sc_intro_paragraph?: string;
  sc_intro_paragraph_cy?: string;
  service_centre?: boolean;
  common_platform?: boolean;
}

/**
 * Facility information
 */
export interface Facility {
  id: number;
  description: string;
  descriptionCy?: string;
}

/**
 * Email information
 */
export interface Email {
  address: string;
  explanation: string;
  explanationCy?: string;
  adminEmailTypeId?: number;
}

/**
 * Court types and codes information
 */
export interface CourtTypesAndCodes {
  gbsCode?: string;
  dxCodes?: DxCode[];
  types?: CourtType[];
}

/**
 * DX code information
 */
export interface DxCode {
  code: string;
  explanation: string;
  explanationCy?: string;
}

/**
 * Area of law information
 */
export interface AreaOfLaw {
  id: number;
  name: string;
  singlePointEntry?: boolean;
  external_link?: string;
  external_link_desc?: string;
  external_link_desc_cy?: string;
  alt_name?: string;
  alt_name_cy?: string;
  display_name?: string;
  display_name_cy?: string;
  display_external_link?: string;
}

/**
 * Contact information
 */
export interface Contact {
  number: string;
  explanation: string;
  fax?: boolean;
  type_id: number;
  explanation_cy?: string;
}

/**
 * Application update information
 */
export interface ApplicationUpdate {
  type: string;
  email: string;
  type_cy?: string;
  external_link?: string;
  external_link_description?: string;
  external_link_description_cy?: string;
}

/**
 * Court address information
 */
export interface CourtAddress {
  id: number;
  postcode: string;
  type_id: number;
  address_lines: string[];
  address_lines_cy?: string[];
  town: string;
  town_cy?: string;
  county_id?: number;
  fields_of_law?: CourtSecondaryAddressType;
  sort_order?: number;
  epim_id?: string;
}

/**
 * Court secondary address type information
 */
export interface CourtSecondaryAddressType {
  areas_of_law?: AreaOfLaw[];
  courts?: CourtType[];
}

/**
 * Additional link information
 */
export interface AdditionalLink {
  url: string;
  display_name: string;
  display_name_cy?: string;
}

/**
 * Single Point of Entry Area of Law information
 */
export interface SpoeAreaOfLaw {
  id: number;
  name: string;
  singlePointEntry: boolean;
}

/**
 * Contact type information
 */
export interface ContactType {
  id: number;
  type: string;
  type_cy?: string;
}

/**
 * New court information for court creation
 */
export interface NewCourt {
  new_court_name: string; // Must match pattern: "^[a-zA-Z0-9-'() ]*$"
  service_centre?: boolean;
  service_areas?: string[];
  lon?: number;
  lat?: number;
}

/**
 * Court lock information
 */
export interface CourtLock {
  id: number;
  lock_acquired: string; // date-time
  user_email: string;
  court_slug: string;
}

/**
 * Service information
 */
export interface Service {
  name: string;
  description: string;
  slug: string;
  serviceAreas?: ServiceArea[];
}

/**
 * Service area information
 */
export interface ServiceArea {
  name: string;
  description: string;
  slug: string;
  serviceAreaType: string;
  onlineUrl?: string;
  onlineText?: string;
  areaOfLawName?: string;
  serviceAreaCourts?: ServiceAreaCourt[];
  text?: string;
}

/**
 * Service area court information
 */
export interface ServiceAreaCourt {
  slug: string;
  catchmentType: string;
  courtName: string;
}

/**
 * Court reference with distance information
 */
export interface CourtReferenceWithDistance {
  name: string;
  slug: string;
  open?: boolean;
  distance?: number;
  areasOfLawSpoe?: string[];
}

/**
 * Service area with court references and distance information
 */
export interface ServiceAreaWithCourtReferencesWithDistance {
  slug: string;
  name: string;
  onlineText?: string;
  onlineUrl?: string;
  courts?: CourtReferenceWithDistance[];
}

/**
 * Court with distance information
 */
export interface CourtWithDistance {
  name: string;
  lat?: number;
  lon?: number;
  number?: number;
  cci_code?: number;
  magistrate_code?: number;
  slug: string;
  types?: string[];
  areas_of_law?: AreaOfLaw[];
  areas_of_law_spoe?: string[];
  displayed?: boolean;
  hide_aols?: boolean;
  dx_number?: string;
  distance?: number;
  addresses?: CourtAddress[];
}

/**
 * Court reference information
 */
export interface CourtReference {
  name: string;
  slug: string;
  updated_at?: string;
  displayed?: boolean;
  region?: number;
}

/**
 * Old court information (deprecated)
 */
export interface OldCourt {
  name: string;
  slug: string;
  info?: string;
  open?: boolean;
  directions?: string;
  lat?: number;
  lon?: number;
  crown_location_code?: number;
  county_location_code?: number;
  cci_code?: number;
  magistrates_location_code?: number;
  areas_of_law?: string[];
  types?: string[];
  emails?: Email[];
  contacts?: Contact[];
  opening_times?: OpeningTime[];
  facilities?: OldFacility[];
  addresses?: OldCourtAddress[];
  gbs?: string;
  location_code?: number;
  court_code?: number;
  areas_of_law_spoe?: string[];
}

/**
 * Old court address information (deprecated)
 */
export interface OldCourtAddress {
  type: string;
  address: string;
  town: string;
  postcode: string;
}

/**
 * Old facility information (deprecated)
 */
export interface OldFacility {
  description: string;
  name: string;
}

/**
 * Court reference with historical name information
 */
export interface CourtReferenceWithHistoricalName extends CourtReference {
  historicalName?: string;
}

/**
 * Court information for download
 */
export interface CourtForDownload {
  name: string;
  open?: string;
  updated?: string;
  addresses?: string;
  areas_of_law?: string;
  court_types?: string;
  crown_court_code?: number;
  county_court_code?: number;
  magistrates_court_code?: number;
  facilities?: string;
  slug: string;
  emails?: string;
  contacts?: string;
  opening_times?: string;
  application_updates?: string;
  dx_number?: string;
}

/**
 * Region information
 */
export interface Region {
  id: number;
  name: string;
  country: string;
}

/**
 * Email type information
 */
export interface EmailType {
  id: number;
  description: string;
  description_cy?: string;
}

/**
 * County information
 */
export interface County {
  id: number;
  name: string;
  country: string;
}

/**
 * Audit type information
 */
export interface AuditType {
  id: number;
  name: string;
}

/**
 * Audit information
 */
export interface Audit {
  id: number;
  action: AuditType;
  location: string;
  user_email: string;
  action_data_before?: string;
  action_data_after?: string;
  creation_time: string; // date-time
}

/**
 * Address type information
 */
export interface AddressType {
  id: number;
  name: string;
  name_cy?: string;
}

/**
 * Court details extending the basic Court interface
 */
export interface CourtDetails extends Court {
  // Additional court detail properties can be added here as needed
  directions?: unknown;
  image_file?: string;
  lat?: number;
  lon?: number;
  crown_location_code?: unknown;
  county_location_code?: unknown;
  magistrates_location_code?: unknown;
  family_location_code?: unknown;
  tribunal_location_code?: unknown;
  areas_of_law?: AreaOfLaw[];
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
  service_centre?: {
    is_a_service_centre?: boolean;
    intro_paragraph?: string;
    intro_paragraph_cy?: string;
  };
} 