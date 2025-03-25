import {
  AreaOfLaw,
  Contact,
  Court,
  CourtAddress,
  CourtReference,
  CourtReferenceWithHistoricalName,
  Email,
} from '../factAPI';

export interface SearchOptionRequest {
  knowLocation: string | undefined;
}

export const ActionTypes = ['nearest', 'documents', 'update', 'not-listed'] as const;
export type ActionTypesTuple = typeof ActionTypes;
export type ActionType = ActionTypesTuple[number] | undefined;

export interface ChooseActionRequest {
  chooseAction: ActionType;
}

export interface ErrorDescription {
  title?: string | undefined;
  text?: string | undefined;
}

export interface CourtsRequest {
  search: string | undefined;
}

export interface ErrorPayload {
  error?: ErrorDescription | string | undefined;
}

export interface CourtsResponsePayload extends ErrorPayload {
  search?: string | undefined;
  results?: CourtReference[] | undefined;
  courtHistory?: CourtReferenceWithHistoricalName | undefined;
  foundResults?: string | undefined;
  foundResult?: string | undefined;
}

export interface ClosedCourtDetail {
  title?: string | undefined;
  name?: string | undefined;
}

export interface OpenCourtDetail {
  title?: string | undefined;
  name?: string | undefined;
  results?: Court | undefined;
  notInPersonP1?: string | undefined;
}

export interface ExtraCourtDetail {
  directions: unknown;
  image_file?: string | undefined;
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
  application_updates: [];
  facilities: [];
  addresses: CourtAddress[];
  gbs: unknown;
  dx_number: unknown[];
  service_area: unknown[];
  additional_links: unknown[];
  common_flag: unknown;
  region_id: number;
  service_centre: {
    is_a_service_centre?: boolean | undefined;
    intro_paragraph?: string | undefined;
    intro_paragraph_cy?: string | undefined;
  };
}
