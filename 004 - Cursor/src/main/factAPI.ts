import { 
  CourtDetails, 
  CourtHistory,
  CourtReference,
  CourtReferenceWithHistoricalName,
  ServiceArea,
  ServiceAreaWithCourtReferencesWithDistance
} from './types/factApiTypes';

import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';

const logger = Logger.getLogger('factAPI');

// Define the base URL for the FACT API
const FACT_API_BASE_URL = 'http://localhost:8081';

/**
 * Service for interacting with the FACT API
 */
export class FactApi {
  /**
   * Get a list of all courts
   * @param query Optional search query
   * @returns Promise with the court data
   */
  public async getCourts(query?: string): Promise<CourtReference[]> {
    try {
      let url = `${FACT_API_BASE_URL}/courts`;
      
      // Add query parameters if provided
      if (query) {
        url += `?q=${encodeURIComponent(query)}`;
      }
      
      logger.info(`Calling FACT API: GET ${url}`);
      const response = await axios.get<CourtReference[]>(url);
      return response.data;
    } catch (error) {
      logger.error('Error calling FACT API getCourts:', error);
      throw error;
    }
  }

  /**
   * Search for a court in court history
   * @param query Search query
   * @returns Promise with the search results
   */
  public async searchCourtHistory(query: string): Promise<CourtReferenceWithHistoricalName> {
    try {
      const url = `${FACT_API_BASE_URL}/courts/court-history/search?q=${encodeURIComponent(query)}`;
      
      logger.info(`Calling FACT API: GET ${url}`);
      const response = await axios.get<CourtReferenceWithHistoricalName>(url);
      return response.data;
    } catch (error) {
      logger.error('Error calling FACT API searchCourtHistory:', error);
      throw error;
    }
  }

  /**
   * Get court details by slug
   * @param slug Court slug identifier
   * @returns Promise with the court details
   */
  public async getCourtBySlug(slug: string): Promise<CourtDetails> {
    try {
      const url = `${FACT_API_BASE_URL}/courts/${encodeURIComponent(slug)}`;
      
      logger.info(`Calling FACT API: GET ${url}`);
      const response = await axios.get<CourtDetails>(url);
      return response.data;
    } catch (error) {
      logger.error('Error calling FACT API getCourtBySlug:', error);
      throw error;
    }
  }

  /**
   * Get all service areas
   * @returns Promise with all service areas
   */
  public async getServiceAreas(): Promise<ServiceArea[]> {
    try {
      const url = `${FACT_API_BASE_URL}/admin/serviceAreas`;
      
      logger.info(`Calling FACT API: GET ${url}`);
      const response = await axios.get<ServiceArea[]>(url);
      return response.data;
    } catch (error) {
      logger.error('Error calling FACT API getServiceAreas:', error);
      throw error;
    }
  }

  /**
   * Find courts by postcode and service area
   * @param postcode Optional postcode to search for
   * @param serviceArea Optional service area slug to filter by
   * @param includeClosed Whether to include closed courts in results
   * @returns Promise with search results
   */
  public async findCourtsByPostcodeAndServiceArea(
    postcode?: string, 
    serviceArea?: string,
    includeClosed: boolean = false
  ): Promise<ServiceAreaWithCourtReferencesWithDistance> {
    try {
      let url = `${FACT_API_BASE_URL}/search/results?`;
      
      if (postcode) {
        url += `postcode=${encodeURIComponent(postcode)}&`;
      }
      
      if (serviceArea) {
        url += `serviceArea=${encodeURIComponent(serviceArea)}&`;
      }
      
      url += `includeClosed=${includeClosed}`;
      
      logger.info(`Calling FACT API: GET ${url}`);
      const response = await axios.get<ServiceAreaWithCourtReferencesWithDistance>(url);
      return response.data;
    } catch (error) {
      logger.error('Error calling FACT API findCourtsByPostcodeAndServiceArea:', error);
      throw error;
    }
  }

  /**
   * Get court history by court ID
   * @param courtId Court ID
   * @returns Promise with court history
   */
  public async getCourtHistoryByCourtId(courtId: number): Promise<CourtHistory[]> {
    try {
      const url = `${FACT_API_BASE_URL}/admin/courts/court-id/${courtId}/history`;
      
      logger.info(`Calling FACT API: GET ${url}`);
      const response = await axios.get<CourtHistory[]>(url);
      return response.data;
    } catch (error) {
      logger.error('Error calling FACT API getCourtHistoryByCourtId:', error);
      throw error;
    }
  }
}

// Export a singleton instance of the API service
export const factApiService = new FactApi(); 