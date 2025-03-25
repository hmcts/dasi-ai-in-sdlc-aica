import axios from 'axios';
import { Court, CourtReferenceWithHistoricalName } from '../types/Api';

const BASE_URL = 'http://localhost:8081';

export class FactAPI {
  static async getCourts(query: string): Promise<Court[]> {
    try {
      const response = await axios.get<Court[]>(`${BASE_URL}/courts`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching courts: ${error.message}`);
    }
  }

  static async searchCourtHistory(query: string): Promise<CourtReferenceWithHistoricalName[]> {
    try {
      const response = await axios.get<CourtReferenceWithHistoricalName[]>(`${BASE_URL}/courts/court-history/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error searching court history: ${error.message}`);
    }
  }

  static async getCourtBySlug(slug: string): Promise<Court> {
    try {
      const response = await axios.get<Court>(`${BASE_URL}/courts/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching court by slug: ${error.message}`);
    }
  }
}
