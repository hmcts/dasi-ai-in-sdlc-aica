import axios from 'axios';
import {
  Court,
  CourtHistorySearchParameters,
  CourtHistorySearchResponse,
  CourtSearchParameters,
  CourtSearchResponse
} from './factApiTypes';

/**
 * Service for interacting with the FACT API
 */
export class FactAPI {
  private baseUrl: string;

  /**
   * Create a new instance of the FactAPI service
   * @param baseUrl The base URL of the FACT API
   */
  constructor(baseUrl: string = 'http://localhost:8081') {
    this.baseUrl = baseUrl;
  }

  /**
   * Search for courts based on the provided parameters
   * @param params Search parameters
   * @returns Promise resolving to the search results
   */
  async searchCourts(params: CourtSearchParameters): Promise<CourtSearchResponse> {
    try {
      // The API only accepts a 'q' parameter
      const response = await axios.get<Court[]>(`${this.baseUrl}/courts`, {
        params: {
          q: params.q
        }
      });
      return { courts: response.data, total: response.data.length };
    } catch (error) {
      console.error('Error searching courts:', error);
      return { courts: [], total: 0 };
    }
  }

  /**
   * Search for court history based on the provided parameters
   * @param params Search parameters
   * @returns Promise resolving to the search results
   */
  async searchCourtHistory(params: CourtHistorySearchParameters): Promise<CourtHistorySearchResponse> {
    try {
      // The API only accepts a 'q' parameter
      const response = await axios.get<CourtHistorySearchResponse>(`${this.baseUrl}/courts/court-history/search`, {
        params: {
          q: params.q
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching court history:', error);
      return { courts: [] };
    }
  }

  /**
   * Get details for a specific court by slug
   * @param slug The court slug
   * @returns Promise resolving to the court details
   */
  async getCourtBySlug(slug: string): Promise<Court | null> {
    try {
      // The API returns additional details not fully documented in the Swagger
      const response = await axios.get<Court>(`${this.baseUrl}/courts/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting court with slug ${slug}:`, error);
      return null;
    }
  }
}

// Export a singleton instance of the FactAPI service
export const factApiService = new FactAPI();
