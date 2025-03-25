/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Court {
  slug?: string;
  name?: string;
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

export interface CourtType {
  /** @format int32 */
  id?: number;
  name?: string;
  search?: string;
  /** @format int32 */
  code?: number;
}

export interface OpeningTime {
  description?: string;
  hours?: string;
  description_cy?: string;
}

export interface ImageFile {
  image_name?: string;
}

export interface CourtInfoUpdate {
  courts?: string[];
  info?: string;
  info_cy?: string;
}

export interface OpeningType {
  /** @format int32 */
  id?: number;
  type?: string;
  type_cy?: string;
}

export interface LocalAuthority {
  /** @format int32 */
  id?: number;
  name?: string;
}

export interface FacilityType {
  /** @format int32 */
  id?: number;
  name?: string;
  nameCy?: string;
  image?: string;
  imageDescription?: string;
  imageFilePath?: string;
  /** @format int32 */
  order?: number;
}

export interface CourtHistory {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  search_court_id?: number;
  court_name?: string;
  /** @format date-time */
  updated_at?: string;
  /** @format date-time */
  created_at?: string;
  court_name_cy?: string;
}

export interface CourtGeneralInfo {
  name?: string;
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

export interface Facility {
  /** @format int32 */
  id?: number;
  description?: string;
  descriptionCy?: string;
}

export interface Email {
  address?: string;
  explanation?: string;
  explanationCy?: string;
  /** @format int32 */
  adminEmailTypeId?: number;
}

export interface CourtTypesAndCodes {
  gbsCode?: string;
  dxCodes?: DxCode[];
  types?: CourtType[];
}

export interface DxCode {
  code?: string;
  explanation?: string;
  explanationCy?: string;
}

export interface AreaOfLaw {
  /** @format int32 */
  id?: number;
  name?: string;
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

export interface Contact {
  number?: string;
  explanation?: string;
  fax?: boolean;
  /** @format int32 */
  type_id?: number;
  explanation_cy?: string;
}

export interface ApplicationUpdate {
  type?: string;
  email?: string;
  type_cy?: string;
  external_link?: string;
  external_link_description?: string;
  external_link_description_cy?: string;
}

export interface CourtAddress {
  /** @format int32 */
  id?: number;
  postcode?: string;
  /** @format int32 */
  type_id?: number;
  address_lines?: string[];
  address_lines_cy?: string[];
  town?: string;
  town_cy?: string;
  /** @format int32 */
  county_id?: number;
  fields_of_law?: CourtSecondaryAddressType;
  /** @format int32 */
  sort_order?: number;
  epim_id?: string;
}

export interface CourtSecondaryAddressType {
  areas_of_law?: AreaOfLaw[];
  courts?: CourtType[];
}

export interface AdditionalLink {
  url?: string;
  display_name?: string;
  display_name_cy?: string;
}

export interface SpoeAreaOfLaw {
  /** @format int32 */
  id?: number;
  name?: string;
  singlePointEntry?: boolean;
}

export interface ContactType {
  /** @format int32 */
  id?: number;
  type?: string;
  type_cy?: string;
}

export interface NewCourt {
  /**
   * @minLength 1
   * @maxLength 200
   * @pattern ^[a-zA-Z0-9-'() ]*$
   */
  new_court_name?: string;
  service_centre?: boolean;
  service_areas?: string[];
  /** @format double */
  lon?: number;
  /** @format double */
  lat?: number;
}

export interface CourtLock {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  lock_acquired?: string;
  user_email?: string;
  court_slug?: string;
}

export interface Service {
  name?: string;
  description?: string;
  slug?: string;
  serviceAreas?: ServiceArea[];
}

export interface ServiceArea {
  name?: string;
  description?: string;
  slug?: string;
  serviceAreaType?: string;
  onlineUrl?: string;
  onlineText?: string;
  areaOfLawName?: string;
  serviceAreaCourts?: ServiceAreaCourt[];
  text?: string;
}

export interface ServiceAreaCourt {
  slug?: string;
  catchmentType?: string;
  courtName?: string;
}

export interface CourtReferenceWithDistance {
  name?: string;
  slug?: string;
  open?: boolean;
  distance?: number;
  areasOfLawSpoe?: string[];
}

export interface ServiceAreaWithCourtReferencesWithDistance {
  slug?: string;
  name?: string;
  onlineText?: string;
  onlineUrl?: string;
  courts?: CourtReferenceWithDistance[];
}

export interface CourtWithDistance {
  name?: string;
  /** @format double */
  lat?: number;
  /** @format double */
  lon?: number;
  /** @format int32 */
  number?: number;
  /** @format int32 */
  cci_code?: number;
  /** @format int32 */
  magistrate_code?: number;
  slug?: string;
  types?: string[];
  areas_of_law?: AreaOfLaw[];
  areas_of_law_spoe?: string[];
  displayed?: boolean;
  hide_aols?: boolean;
  dx_number?: string;
  distance?: number;
  addresses?: CourtAddress[];
}

export interface CourtReference {
  name?: string;
  slug?: string;
  updated_at?: string;
  displayed?: boolean;
  /** @format int32 */
  region?: number;
}

export interface OldCourt {
  name?: string;
  slug?: string;
  info?: string;
  open?: boolean;
  directions?: string;
  /** @format double */
  lat?: number;
  /** @format double */
  lon?: number;
  /** @format int32 */
  crown_location_code?: number;
  /** @format int32 */
  county_location_code?: number;
  /** @format int32 */
  cci_code?: number;
  /** @format int32 */
  magistrates_location_code?: number;
  areas_of_law?: string[];
  types?: string[];
  emails?: Email[];
  contacts?: Contact[];
  opening_times?: OpeningTime[];
  facilities?: OldFacility[];
  addresses?: OldCourtAddress[];
  gbs?: string;
  /** @format int32 */
  location_code?: number;
  /** @format int32 */
  court_code?: number;
  areas_of_law_spoe?: string[];
}

export interface OldCourtAddress {
  type?: string;
  address?: string;
  town?: string;
  postcode?: string;
}

export interface OldFacility {
  description?: string;
  name?: string;
}

export interface CourtReferenceWithHistoricalName {
  name?: string;
  slug?: string;
  updated_at?: string;
  displayed?: boolean;
  /** @format int32 */
  region?: number;
  historicalName?: string;
}

export interface CourtForDownload {
  name?: string;
  open?: string;
  updated?: string;
  addresses?: string;
  areas_of_law?: string;
  court_types?: string;
  /** @format int32 */
  crown_court_code?: number;
  /** @format int32 */
  county_court_code?: number;
  /** @format int32 */
  magistrates_court_code?: number;
  facilities?: string;
  slug?: string;
  emails?: string;
  contacts?: string;
  opening_times?: string;
  application_updates?: string;
  dx_number?: string;
}

export interface Region {
  /** @format int32 */
  id?: number;
  name?: string;
  country?: string;
}

export interface EmailType {
  /** @format int32 */
  id?: number;
  description?: string;
  description_cy?: string;
}

export interface County {
  /** @format int32 */
  id?: number;
  name?: string;
  country?: string;
}

export interface Audit {
  /** @format int32 */
  id?: number;
  action?: AuditType;
  location?: string;
  user_email?: string;
  action_data_before?: string;
  action_data_after?: string;
  /** @format date-time */
  creation_time?: string;
}

export interface AuditType {
  /** @format int32 */
  id?: number;
  name?: string;
}

export interface AddressType {
  /** @format int32 */
  id?: number;
  name?: string;
  name_cy?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8081";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title FaCT API
 * @version 1.0.0
 * @license MIT (https://opensource.org/licenses/MIT)
 * @baseUrl http://localhost:8081
 * @externalDocs https://github.com/hmcts/fact-api
 *
 * API for all operations relating to the FaCT application.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags root-controller
   * @name Welcome
   * @request GET:/
   */
  welcome = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  courts = {
    /**
     * No description
     *
     * @tags admin-courts-controller
     * @name FindCourtByName1
     * @summary Find court details by slug
     * @request GET:/courts/{slug}/general
     */
    findCourtByName1: (slug: string, params: RequestParams = {}) =>
      this.request<Court, any>({
        path: `/courts/${slug}/general`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-courts-controller
     * @name UpdateCourtBySlug
     * @summary Update court
     * @request PUT:/courts/{slug}/general
     */
    updateCourtBySlug: (slug: string, data: Court, params: RequestParams = {}) =>
      this.request<Court, any>({
        path: `/courts/${slug}/general`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-courts-controller
     * @name GetCourtImageBySlug
     * @summary Find the photo for a court
     * @request GET:/courts/{slug}/courtPhoto
     */
    getCourtImageBySlug: (slug: string, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/courts/${slug}/courtPhoto`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-courts-controller
     * @name UpdateCourtImageBySlug
     * @summary Update the photo for a court
     * @request PUT:/courts/{slug}/courtPhoto
     */
    updateCourtImageBySlug: (slug: string, data: ImageFile, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/courts/${slug}/courtPhoto`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-courts-controller
     * @name UpdateCourtsInfo
     * @summary Update selected courts info
     * @request PUT:/courts/info
     */
    updateCourtsInfo: (data: CourtInfoUpdate, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/courts/info`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags courts-controller
     * @name FindCourtByNameOrAddressOrPostcodeOrTown
     * @summary Find courts by name, address, town or postcode
     * @request GET:/courts
     */
    findCourtByNameOrAddressOrPostcodeOrTown: (
      query: {
        q: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CourtReference[], any>({
        path: `/courts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-courts-controller
     * @name AddNewCourt
     * @summary Add a new court
     * @request POST:/courts
     */
    addNewCourt: (data: NewCourt, params: RequestParams = {}) =>
      this.request<Court, Court>({
        path: `/courts`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags courts-controller
     * @name FindCourtByName
     * @summary Find court details by slug
     * @request GET:/courts/{slug}
     */
    findCourtByName: (slug: string, params: RequestParams = {}) =>
      this.request<Court, any>({
        path: `/courts/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-courts-controller
     * @name DeleteCourt
     * @summary Delete a court
     * @request DELETE:/courts/{slug}
     */
    deleteCourt: (slug: string, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/courts/${slug}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags courts-controller
     * @name FindCourtByNameDeprecated
     * @summary Find court details by name
     * @request GET:/courts/{slug}.json
     * @deprecated
     */
    findCourtByNameDeprecated: (slug: string, params: RequestParams = {}) =>
      this.request<OldCourt, any>({
        path: `/courts/${slug}.json`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags courts-controller
     * @name GetCourtsBySearch
     * @summary Return active courts based on a provided prefix
     * @request GET:/courts/search
     */
    getCourtsBySearch: (
      query: {
        /**
         * @minLength 1
         * @maxLength 1
         */
        prefix: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CourtReference[], any>({
        path: `/courts/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags courts-controller
     * @name FindByCourtTypes
     * @summary Find courts by court types. This endpoint can be used to search for courts that have a court type associated to it
     * @request GET:/courts/court-types/{courtTypes}
     */
    findByCourtTypes: (courtTypes: string[], params: RequestParams = {}) =>
      this.request<Court[], Court[]>({
        path: `/courts/court-types/${courtTypes}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags courts-controller
     * @name GetCourtByCourtHistoryNameSearch
     * @summary Return active court based a search of old court names
     * @request GET:/courts/court-history/search
     */
    getCourtByCourtHistoryNameSearch: (
      query: {
        q: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CourtReferenceWithHistoricalName, CourtReferenceWithHistoricalName>({
        path: `/courts/court-history/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-courts-controller
     * @name GetAllCourts
     * @summary Return all courts
     * @request GET:/courts/all
     */
    getAllCourts: (params: RequestParams = {}) =>
      this.request<CourtReference[], any>({
        path: `/courts/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-courts-controller
     * @name GetAllCourtsForDownload
     * @summary Return court data for download
     * @request GET:/courts/
     */
    getAllCourtsForDownload: (params: RequestParams = {}) =>
      this.request<CourtForDownload[], any>({
        path: `/courts/`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @tags admin-opening-type-controller
     * @name GetAllOpeningTypes
     * @summary Retrieve all opening types
     * @request GET:/admin/openingTypes
     */
    getAllOpeningTypes: (params: RequestParams = {}) =>
      this.request<OpeningType[], OpeningType[]>({
        path: `/admin/openingTypes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-opening-type-controller
     * @name UpdateOpeningType
     * @summary Update opening type
     * @request PUT:/admin/openingTypes
     */
    updateOpeningType: (data: OpeningType, params: RequestParams = {}) =>
      this.request<OpeningType, OpeningType>({
        path: `/admin/openingTypes`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-opening-type-controller
     * @name CreateOpeningType
     * @summary Create opening type
     * @request POST:/admin/openingTypes
     */
    createOpeningType: (data: OpeningType, params: RequestParams = {}) =>
      this.request<OpeningType, OpeningType>({
        path: `/admin/openingTypes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-local-authorities-controller
     * @name UpdateLocalAuthority
     * @summary Update local authority
     * @request PUT:/admin/localauthorities/{localAuthorityId}
     */
    updateLocalAuthority: (localAuthorityId: number, data: string, params: RequestParams = {}) =>
      this.request<LocalAuthority, LocalAuthority>({
        path: `/admin/localauthorities/${localAuthorityId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-facilities-controller
     * @name GetAllFacilities
     * @summary Return all facility types
     * @request GET:/admin/facilities
     */
    getAllFacilities: (params: RequestParams = {}) =>
      this.request<FacilityType[], FacilityType[]>({
        path: `/admin/facilities`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-facilities-controller
     * @name UpdateFacilityType
     * @summary Update facility type
     * @request PUT:/admin/facilities
     */
    updateFacilityType: (data: FacilityType, params: RequestParams = {}) =>
      this.request<FacilityType, FacilityType>({
        path: `/admin/facilities`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-facilities-controller
     * @name CreateFacilityType
     * @summary Create new facility type
     * @request POST:/admin/facilities
     */
    createFacilityType: (data: FacilityType, params: RequestParams = {}) =>
      this.request<FacilityType, FacilityType>({
        path: `/admin/facilities`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-facilities-controller
     * @name ReorderFacilityTypes
     * @summary Reorder facility types
     * @request PUT:/admin/facilities/reorder
     */
    reorderFacilityTypes: (data: number[], params: RequestParams = {}) =>
      this.request<FacilityType[], FacilityType[]>({
        path: `/admin/facilities/reorder`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-postcode-controller
     * @name MovePostcodes
     * @summary Move postcodes from one court to another
     * @request PUT:/admin/courts/{sourceSlug}/{destinationSlug}/postcodes
     */
    movePostcodes: (sourceSlug: string, destinationSlug: string, data: string[], params: RequestParams = {}) =>
      this.request<string[], string[]>({
        path: `/admin/courts/${sourceSlug}/${destinationSlug}/postcodes`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-local-authorities-controller
     * @name GetCourtLocalAuthorities
     * @summary Find a courts local authorities by slug
     * @request GET:/admin/courts/{slug}/{areaOfLaw}/localAuthorities
     */
    getCourtLocalAuthorities: (slug: string, areaOfLaw: string, params: RequestParams = {}) =>
      this.request<LocalAuthority[], any>({
        path: `/admin/courts/${slug}/${areaOfLaw}/localAuthorities`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-local-authorities-controller
     * @name UpdateCourtLocalAuthorities
     * @summary Update a courts local authorities for a area of law by super admin
     * @request PUT:/admin/courts/{slug}/{areaOfLaw}/localAuthorities
     */
    updateCourtLocalAuthorities: (
      slug: string,
      areaOfLaw: string,
      data: LocalAuthority[],
      params: RequestParams = {},
    ) =>
      this.request<LocalAuthority[], any>({
        path: `/admin/courts/${slug}/${areaOfLaw}/localAuthorities`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-opening-time-controller
     * @name GetCourtOpeningTimes
     * @summary Find court opening times by slug
     * @request GET:/admin/courts/{slug}/openingTimes
     */
    getCourtOpeningTimes: (slug: string, params: RequestParams = {}) =>
      this.request<OpeningTime[], any>({
        path: `/admin/courts/${slug}/openingTimes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-opening-time-controller
     * @name UpdateCourtOpeningTimes
     * @summary Update court opening times
     * @request PUT:/admin/courts/{slug}/openingTimes
     */
    updateCourtOpeningTimes: (slug: string, data: OpeningTime[], params: RequestParams = {}) =>
      this.request<OpeningTime[], any>({
        path: `/admin/courts/${slug}/openingTimes`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-history-controller
     * @name GetCourtHistoryByCourtSlug
     * @summary Get all court histories of a court
     * @request GET:/admin/courts/{slug}/history
     */
    getCourtHistoryByCourtSlug: (slug: string, params: RequestParams = {}) =>
      this.request<CourtHistory[], CourtHistory[]>({
        path: `/admin/courts/${slug}/history`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-history-controller
     * @name UpdateCourtHistories
     * @summary Replace the court histories of a given court
     * @request PUT:/admin/courts/{slug}/history
     */
    updateCourtHistories: (slug: string, data: CourtHistory[], params: RequestParams = {}) =>
      this.request<CourtHistory[], CourtHistory[]>({
        path: `/admin/courts/${slug}/history`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-general-info-controller
     * @name GetCourtGeneralInfo
     * @summary Retrieve court general information
     * @request GET:/admin/courts/{slug}/generalInfo
     */
    getCourtGeneralInfo: (slug: string, params: RequestParams = {}) =>
      this.request<CourtGeneralInfo, any>({
        path: `/admin/courts/${slug}/generalInfo`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-general-info-controller
     * @name UpdateCourtGeneralInfo
     * @summary Update court general information
     * @request PUT:/admin/courts/{slug}/generalInfo
     */
    updateCourtGeneralInfo: (slug: string, data: CourtGeneralInfo, params: RequestParams = {}) =>
      this.request<CourtGeneralInfo, CourtGeneralInfo>({
        path: `/admin/courts/${slug}/generalInfo`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-facility-controller
     * @name GetCourtFacilities
     * @summary Find a court's facilities by slug
     * @request GET:/admin/courts/{slug}/facilities
     */
    getCourtFacilities: (slug: string, params: RequestParams = {}) =>
      this.request<Facility[], Facility[]>({
        path: `/admin/courts/${slug}/facilities`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-facility-controller
     * @name UpdateCourtFacility
     * @summary Update a court's facilities
     * @request PUT:/admin/courts/{slug}/facilities
     */
    updateCourtFacility: (slug: string, data: Facility[], params: RequestParams = {}) =>
      this.request<Facility[], Facility[]>({
        path: `/admin/courts/${slug}/facilities`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-email-controller
     * @name GetCourtEmails
     * @summary Find email addresses by slug
     * @request GET:/admin/courts/{slug}/emails
     */
    getCourtEmails: (slug: string, params: RequestParams = {}) =>
      this.request<Email[], any>({
        path: `/admin/courts/${slug}/emails`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-email-controller
     * @name UpdateCourtEmails
     * @summary Update email addresses for a provided court
     * @request PUT:/admin/courts/{slug}/emails
     */
    updateCourtEmails: (slug: string, data: Email[], params: RequestParams = {}) =>
      this.request<Email[], any>({
        path: `/admin/courts/${slug}/emails`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-types-and-codes-controller
     * @name GetCourtTypesAndCodes
     * @summary Find a court's types, GBS code and Dx codes by slug
     * @request GET:/admin/courts/{slug}/courtTypesAndCodes
     */
    getCourtTypesAndCodes: (slug: string, params: RequestParams = {}) =>
      this.request<CourtTypesAndCodes, CourtTypesAndCodes>({
        path: `/admin/courts/${slug}/courtTypesAndCodes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-types-and-codes-controller
     * @name UpdateCourtTypesAndCodes
     * @summary Update a court's types, GBS code and Dx codes
     * @request PUT:/admin/courts/{slug}/courtTypesAndCodes
     */
    updateCourtTypesAndCodes: (slug: string, data: CourtTypesAndCodes, params: RequestParams = {}) =>
      this.request<CourtTypesAndCodes, CourtTypesAndCodes>({
        path: `/admin/courts/${slug}/courtTypesAndCodes`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-areas-of-law-controller
     * @name GetCourtAreasOfLaw
     * @summary Find the areas of law for a court
     * @request GET:/admin/courts/{slug}/courtAreasOfLaw
     */
    getCourtAreasOfLaw: (slug: string, params: RequestParams = {}) =>
      this.request<AreaOfLaw[], AreaOfLaw[]>({
        path: `/admin/courts/${slug}/courtAreasOfLaw`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-areas-of-law-controller
     * @name UpdateCourtAreasOfLaw
     * @summary Update the areas of law for a court
     * @request PUT:/admin/courts/{slug}/courtAreasOfLaw
     */
    updateCourtAreasOfLaw: (slug: string, data: AreaOfLaw[], params: RequestParams = {}) =>
      this.request<AreaOfLaw[], AreaOfLaw[]>({
        path: `/admin/courts/${slug}/courtAreasOfLaw`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-contact-controller
     * @name GetCourtContacts
     * @summary Find court contacts by slug
     * @request GET:/admin/courts/{slug}/contacts
     */
    getCourtContacts: (slug: string, params: RequestParams = {}) =>
      this.request<Contact[], any>({
        path: `/admin/courts/${slug}/contacts`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-contact-controller
     * @name UpdateCourtContacts
     * @summary Update court contacts
     * @request PUT:/admin/courts/{slug}/contacts
     */
    updateCourtContacts: (slug: string, data: Contact[], params: RequestParams = {}) =>
      this.request<Contact[], any>({
        path: `/admin/courts/${slug}/contacts`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-application-update-controller
     * @name GetApplicationUpdates
     * @summary Find application progression options by slug
     * @request GET:/admin/courts/{slug}/application-progression
     */
    getApplicationUpdates: (slug: string, params: RequestParams = {}) =>
      this.request<ApplicationUpdate[], ApplicationUpdate[]>({
        path: `/admin/courts/${slug}/application-progression`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-application-update-controller
     * @name UpdateApplicationUpdates
     * @summary Update application progression options for a provided service centre
     * @request PUT:/admin/courts/{slug}/application-progression
     */
    updateApplicationUpdates: (slug: string, data: ApplicationUpdate[], params: RequestParams = {}) =>
      this.request<ApplicationUpdate[], ApplicationUpdate[]>({
        path: `/admin/courts/${slug}/application-progression`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-address-controller
     * @name GetCourtAddresses
     * @summary Find court addresses by slug
     * @request GET:/admin/courts/{slug}/addresses
     */
    getCourtAddresses: (slug: string, params: RequestParams = {}) =>
      this.request<CourtAddress[], CourtAddress[]>({
        path: `/admin/courts/${slug}/addresses`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-address-controller
     * @name UpdateCourtAddresses
     * @summary Update addresses for a provided court
     * @request PUT:/admin/courts/{slug}/addresses
     */
    updateCourtAddresses: (slug: string, data: CourtAddress[], params: RequestParams = {}) =>
      this.request<CourtAddress[], CourtAddress[]>({
        path: `/admin/courts/${slug}/addresses`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-additional-link-controller
     * @name GetCourtAdditionalLinks
     * @summary Find court additional links by slug
     * @request GET:/admin/courts/{slug}/additionalLinks
     */
    getCourtAdditionalLinks: (slug: string, params: RequestParams = {}) =>
      this.request<AdditionalLink[], AdditionalLink[]>({
        path: `/admin/courts/${slug}/additionalLinks`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-additional-link-controller
     * @name UpdateCourtAdditionalLinks
     * @summary Update court additional links
     * @request PUT:/admin/courts/{slug}/additionalLinks
     */
    updateCourtAdditionalLinks: (slug: string, data: AdditionalLink[], params: RequestParams = {}) =>
      this.request<AdditionalLink[], AdditionalLink[]>({
        path: `/admin/courts/${slug}/additionalLinks`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-spoe-areas-of-law-controller
     * @name GetCourtAreasOfLaw1
     * @summary Find the spoe areas of law for a court
     * @request GET:/admin/courts/{slug}/SpoeAreasOfLaw
     */
    getCourtAreasOfLaw1: (slug: string, params: RequestParams = {}) =>
      this.request<SpoeAreaOfLaw[], SpoeAreaOfLaw[]>({
        path: `/admin/courts/${slug}/SpoeAreasOfLaw`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-spoe-areas-of-law-controller
     * @name UpdateCourtAreasOfLaw1
     * @summary Update the spoe areas of law for a court
     * @request PUT:/admin/courts/{slug}/SpoeAreasOfLaw
     */
    updateCourtAreasOfLaw1: (slug: string, data: SpoeAreaOfLaw[], params: RequestParams = {}) =>
      this.request<SpoeAreaOfLaw[], SpoeAreaOfLaw[]>({
        path: `/admin/courts/${slug}/SpoeAreasOfLaw`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-history-controller
     * @name GetAllCourtHistory
     * @summary Get all court histories
     * @request GET:/admin/courts/history
     */
    getAllCourtHistory: (params: RequestParams = {}) =>
      this.request<CourtHistory[], CourtHistory[]>({
        path: `/admin/courts/history`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-history-controller
     * @name UpdateCourtHistory
     * @summary Change an existing court history
     * @request PUT:/admin/courts/history
     */
    updateCourtHistory: (data: CourtHistory, params: RequestParams = {}) =>
      this.request<CourtHistory, CourtHistory>({
        path: `/admin/courts/history`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-history-controller
     * @name AddCourtHistory
     * @summary Add a new court history
     * @request POST:/admin/courts/history
     */
    addCourtHistory: (data: CourtHistory, params: RequestParams = {}) =>
      this.request<CourtHistory, CourtHistory>({
        path: `/admin/courts/history`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-contact-type-controller
     * @name GetAllContactTypes
     * @summary Return all contact types
     * @request GET:/admin/contactTypes
     */
    getAllContactTypes: (params: RequestParams = {}) =>
      this.request<ContactType[], ContactType[]>({
        path: `/admin/contactTypes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-contact-type-controller
     * @name UpdateContactType
     * @summary Update contact type
     * @request PUT:/admin/contactTypes
     */
    updateContactType: (data: ContactType, params: RequestParams = {}) =>
      this.request<ContactType, ContactType>({
        path: `/admin/contactTypes`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-contact-type-controller
     * @name CreateContactType
     * @summary Create contact type
     * @request POST:/admin/contactTypes
     */
    createContactType: (data: ContactType, params: RequestParams = {}) =>
      this.request<ContactType, ContactType>({
        path: `/admin/contactTypes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-areas-of-law-controller
     * @name GetAllAreasOfLaw1
     * @summary Return all areas of law
     * @request GET:/admin/areasOfLaw
     */
    getAllAreasOfLaw1: (params: RequestParams = {}) =>
      this.request<AreaOfLaw[], AreaOfLaw[]>({
        path: `/admin/areasOfLaw`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-areas-of-law-controller
     * @name UpdateAreaOfLaw
     * @summary Update area of law
     * @request PUT:/admin/areasOfLaw
     */
    updateAreaOfLaw: (data: AreaOfLaw, params: RequestParams = {}) =>
      this.request<AreaOfLaw, AreaOfLaw>({
        path: `/admin/areasOfLaw`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-areas-of-law-controller
     * @name CreateAreaOfLaw
     * @summary Create area of law
     * @request POST:/admin/areasOfLaw
     */
    createAreaOfLaw: (data: AreaOfLaw, params: RequestParams = {}) =>
      this.request<AreaOfLaw, AreaOfLaw>({
        path: `/admin/areasOfLaw`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-postcode-controller
     * @name GetCourtPostcodes
     * @summary Find court postcodes by slug
     * @request GET:/admin/courts/{slug}/postcodes
     */
    getCourtPostcodes: (slug: string, params: RequestParams = {}) =>
      this.request<string[], string[]>({
        path: `/admin/courts/${slug}/postcodes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-postcode-controller
     * @name AddCourtPostcodes
     * @summary Add new court postcodes
     * @request POST:/admin/courts/{slug}/postcodes
     */
    addCourtPostcodes: (slug: string, data: string[], params: RequestParams = {}) =>
      this.request<string[], string[]>({
        path: `/admin/courts/${slug}/postcodes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-postcode-controller
     * @name DeleteCourtPostcodes
     * @summary Delete existing court postcodes
     * @request DELETE:/admin/courts/{slug}/postcodes
     */
    deleteCourtPostcodes: (slug: string, data: string[], params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/admin/courts/${slug}/postcodes`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-lock-controller
     * @name GetCourtLocks
     * @summary Find court lock details by slug and username
     * @request GET:/admin/courts/{slug}/lock
     */
    getCourtLocks: (slug: string, params: RequestParams = {}) =>
      this.request<any, CourtLock[]>({
        path: `/admin/courts/${slug}/lock`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-lock-controller
     * @name AddNewCourtLock
     * @summary Add a new lock on a court for a given user
     * @request POST:/admin/courts/{slug}/lock
     */
    addNewCourtLock: (slug: string, data: CourtLock, params: RequestParams = {}) =>
      this.request<CourtLock, CourtLock>({
        path: `/admin/courts/${slug}/lock`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-service-area-controller
     * @name GetServiceArea1
     * @summary Return all service areas
     * @request GET:/admin/serviceAreas
     */
    getServiceArea1: (params: RequestParams = {}) =>
      this.request<ServiceArea[], ServiceArea[]>({
        path: `/admin/serviceAreas`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-region-controller
     * @name GetAllRegions
     * @summary Retrieve all regions
     * @request GET:/admin/regions
     */
    getAllRegions: (params: RequestParams = {}) =>
      this.request<Region[], Region[]>({
        path: `/admin/regions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-opening-type-controller
     * @name GetOpeningType
     * @summary Get opening type
     * @request GET:/admin/openingTypes/{id}
     */
    getOpeningType: (id: number, params: RequestParams = {}) =>
      this.request<any, OpeningType>({
        path: `/admin/openingTypes/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-local-authorities-controller
     * @name GetAllLocalAuthorities
     * @summary Return all local authorities
     * @request GET:/admin/localauthorities/all
     */
    getAllLocalAuthorities: (params: RequestParams = {}) =>
      this.request<LocalAuthority[], any>({
        path: `/admin/localauthorities/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-facilities-controller
     * @name GetFacilityType
     * @summary Get facility type
     * @request GET:/admin/facilities/{id}
     */
    getFacilityType: (id: number, params: RequestParams = {}) =>
      this.request<FacilityType, FacilityType>({
        path: `/admin/facilities/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-history-controller
     * @name GetCourtHistoryByCourtName
     * @summary Get a court history using a historical court name
     * @request GET:/admin/courts/name/{courtName}/history
     */
    getCourtHistoryByCourtName: (courtName: string, params: RequestParams = {}) =>
      this.request<CourtHistory[], CourtHistory[]>({
        path: `/admin/courts/name/${courtName}/history`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-history-controller
     * @name GetCourtHistoryById
     * @summary Get a court history
     * @request GET:/admin/courts/id/{courtHistoryId}/history
     */
    getCourtHistoryById: (courtHistoryId: number, params: RequestParams = {}) =>
      this.request<CourtHistory, CourtHistory>({
        path: `/admin/courts/id/${courtHistoryId}/history`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-history-controller
     * @name DeleteByCourtHistoryId
     * @summary Delete a Court History
     * @request DELETE:/admin/courts/id/{courtHistoryId}/history
     */
    deleteByCourtHistoryId: (courtHistoryId: number, params: RequestParams = {}) =>
      this.request<CourtHistory, CourtHistory>({
        path: `/admin/courts/id/${courtHistoryId}/history`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-email-controller
     * @name GetAllCourtEmailDescTypes
     * @summary Retrieve all email details for provided court
     * @request GET:/admin/courts/emailTypes
     */
    getAllCourtEmailDescTypes: (params: RequestParams = {}) =>
      this.request<EmailType[], any>({
        path: `/admin/courts/emailTypes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-types-and-codes-controller
     * @name GetAllCourtTypes
     * @summary Return all court types
     * @request GET:/admin/courts/courtTypes
     */
    getAllCourtTypes: (params: RequestParams = {}) =>
      this.request<CourtType[], CourtType[]>({
        path: `/admin/courts/courtTypes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-history-controller
     * @name GetCourtHistoryByCourtId
     * @summary Get all court histories of a court
     * @request GET:/admin/courts/court-id/{courtId}/history
     */
    getCourtHistoryByCourtId: (courtId: number, params: RequestParams = {}) =>
      this.request<CourtHistory[], CourtHistory[]>({
        path: `/admin/courts/court-id/${courtId}/history`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-history-controller
     * @name DeleteCourtHistoriesByCourtId
     * @summary Delete the court histories of a specific court
     * @request DELETE:/admin/courts/court-id/{courtId}/history
     */
    deleteCourtHistoriesByCourtId: (courtId: number, params: RequestParams = {}) =>
      this.request<CourtHistory[], CourtHistory[]>({
        path: `/admin/courts/court-id/${courtId}/history`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-spoe-areas-of-law-controller
     * @name GetAllAreasOfLaw
     * @summary Return all spoe areas of law
     * @request GET:/admin/courts/SpoeAreasOfLaw
     */
    getAllAreasOfLaw: (params: RequestParams = {}) =>
      this.request<SpoeAreaOfLaw[], SpoeAreaOfLaw[]>({
        path: `/admin/courts/SpoeAreasOfLaw`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-county-controller
     * @name GetAllCounties
     * @summary Retrieve all counties
     * @request GET:/admin/counties
     */
    getAllCounties: (params: RequestParams = {}) =>
      this.request<County[], County[]>({
        path: `/admin/counties`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-contact-type-controller
     * @name GetContactType
     * @summary Get contact type
     * @request GET:/admin/contactTypes/{id}
     */
    getContactType: (id: number, params: RequestParams = {}) =>
      this.request<ContactType, ContactType>({
        path: `/admin/contactTypes/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-audit-controller
     * @name GetAudits
     * @summary Find all audits based on the provided parameters.
     * @request GET:/admin/audit
     */
    getAudits: (
      query: {
        /** @format int32 */
        page: number;
        /** @format int32 */
        size: number;
        location?: string;
        email?: string;
        /** @format date-time */
        dateFrom?: string;
        /** @format date-time */
        dateTo?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Audit[], Audit[]>({
        path: `/admin/audit`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-areas-of-law-controller
     * @name GetAreaOfLaw
     * @summary Get area of law
     * @request GET:/admin/areasOfLaw/{id}
     */
    getAreaOfLaw: (id: number, params: RequestParams = {}) =>
      this.request<AreaOfLaw, AreaOfLaw>({
        path: `/admin/areasOfLaw/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-address-type-controller
     * @name GetAllCourtAddressTypes
     * @summary Retrieve all address types
     * @request GET:/admin/addressTypes
     */
    getAllCourtAddressTypes: (params: RequestParams = {}) =>
      this.request<AddressType[], AddressType[]>({
        path: `/admin/addressTypes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-opening-type-controller
     * @name DeleteOpeningType
     * @summary Delete opening type
     * @request DELETE:/admin/openingTypes/{openingTypeId}
     */
    deleteOpeningType: (openingTypeId: number, params: RequestParams = {}) =>
      this.request<number, number>({
        path: `/admin/openingTypes/${openingTypeId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-facilities-controller
     * @name DeleteFacilityType
     * @summary Delete facility type
     * @request DELETE:/admin/facilities/{facilityTypeId}
     */
    deleteFacilityType: (facilityTypeId: number, params: RequestParams = {}) =>
      this.request<number, number>({
        path: `/admin/facilities/${facilityTypeId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-lock-controller
     * @name DeleteCourtByEmail
     * @summary Delete a court lock by email
     * @request DELETE:/admin/courts/{userEmail}/lock
     */
    deleteCourtByEmail: (userEmail: string, params: RequestParams = {}) =>
      this.request<CourtLock[], CourtLock[]>({
        path: `/admin/courts/${userEmail}/lock`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-court-lock-controller
     * @name DeleteCourtLockBySlugAndEmail
     * @summary Delete a court lock by slug and email
     * @request DELETE:/admin/courts/{slug}/lock/{userEmail}
     */
    deleteCourtLockBySlugAndEmail: (slug: string, userEmail: string, params: RequestParams = {}) =>
      this.request<CourtLock[], CourtLock[]>({
        path: `/admin/courts/${slug}/lock/${userEmail}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-contact-type-controller
     * @name DeleteContactType
     * @summary Delete contact type
     * @request DELETE:/admin/contactTypes/{contactTypeId}
     */
    deleteContactType: (contactTypeId: number, params: RequestParams = {}) =>
      this.request<number, number>({
        path: `/admin/contactTypes/${contactTypeId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin-areas-of-law-controller
     * @name DeleteAreaOfLaw
     * @summary Delete area of law
     * @request DELETE:/admin/areasOfLaw/{areaOfLawId}
     */
    deleteAreaOfLaw: (areaOfLawId: number, params: RequestParams = {}) =>
      this.request<number, number>({
        path: `/admin/areasOfLaw/${areaOfLawId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  services = {
    /**
     * No description
     *
     * @tags services-controller
     * @name GetAllServices
     * @summary Return all services
     * @request GET:/services
     */
    getAllServices: (params: RequestParams = {}) =>
      this.request<Service[], any>({
        path: `/services`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags services-controller
     * @name GetService
     * @summary Return a service
     * @request GET:/services/{slug}
     */
    getService: (slug: string, params: RequestParams = {}) =>
      this.request<Service, any>({
        path: `/services/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags services-controller
     * @name GetServiceAreas
     * @summary Return all service areas for a service
     * @request GET:/services/{serviceSlug}/service-areas
     */
    getServiceAreas: (serviceSlug: string, params: RequestParams = {}) =>
      this.request<ServiceArea[], any>({
        path: `/services/${serviceSlug}/service-areas`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  serviceAreas = {
    /**
     * No description
     *
     * @tags service-areas-controller
     * @name GetServiceArea
     * @summary Return a service
     * @request GET:/service-areas/{slug}
     */
    getServiceArea: (slug: string, params: RequestParams = {}) =>
      this.request<ServiceArea, any>({
        path: `/service-areas/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  search = {
    /**
     * No description
     *
     * @tags search-controller
     * @name FindCourtsByPostcodeAndServiceArea
     * @summary Find courts by postcode and Service Area
     * @request GET:/search/results
     */
    findCourtsByPostcodeAndServiceArea: (
      query?: {
        postcode?: string;
        serviceArea?: string;
        /** @default false */
        includeClosed?: boolean;
        action?: "NEAREST" | "DOCUMENTS" | "UPDATE" | "UNDEFINED";
      },
      params: RequestParams = {},
    ) =>
      this.request<ServiceAreaWithCourtReferencesWithDistance, any>({
        path: `/search/results`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags search-controller
     * @name FindCourtsByPostcode
     * @summary Find closest courts by postcode
     * @request GET:/search/results/{postcode}
     */
    findCourtsByPostcode: (postcode: string, params: RequestParams = {}) =>
      this.request<CourtReferenceWithDistance[], any>({
        path: `/search/results/${postcode}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags search-controller
     * @name FindCourtByPostcode
     * @summary Find court by postcode, address or name
     * @request GET:/search/results.json
     * @deprecated
     */
    findCourtByPostcode: (
      query?: {
        postcode?: string;
        aol?: string;
        q?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CourtWithDistance[], any>({
        path: `/search/results.json`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  featureFlags = {
    /**
     * No description
     *
     * @tags feature-flag-controller
     * @name FlagStatus
     * @request GET:/feature-flags/{flag}
     */
    flagStatus: (flag: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/feature-flags/${flag}`,
        method: "GET",
        ...params,
      }),
  };
}
