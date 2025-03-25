import { ExtraCourtDetail } from './types/dtos';
import type { paths as Paths, components } from './types/fact-api.schema';

import createClient, { Client } from 'openapi-fetch';

export type CourtReference = components['schemas']['CourtReference'];
export type CourtReferenceWithHistoricalName = components['schemas']['CourtReferenceWithHistoricalName'];
export type Court = components['schemas']['Court'];
export type CourtAddress = components['schemas']['CourtAddress'];
export type Contact = components['schemas']['Contact'];
export type Email = components['schemas']['Email'];
export type AreaOfLaw = components['schemas']['AreaOfLaw'];

// eslint-disable-next-line
export class FactAPI {
  static GetClient(): Client<Paths, `${string}/${string}`> {
    return createClient<Paths>({ baseUrl: 'http://localhost:8081' });
  }

  static async findCourtByNameOrAddressOrPostcodeOrTown(q: string): Promise<CourtReference[] | undefined> {
    const client = FactAPI.GetClient();

    const { data } = await client.GET('/courts', { params: { query: { q } } });

    return data;
  }

  static async getCourtByCourtHistoryNameSearch(q: string): Promise<CourtReferenceWithHistoricalName | undefined> {
    const client = FactAPI.GetClient();

    const { data } = await client.GET('/courts/court-history/search', { params: { query: { q } } });

    return data;
  }

  static async findCourtByName(slug: string): Promise<(Court & ExtraCourtDetail) | undefined> {
    const client = FactAPI.GetClient();

    const { data } = await client.GET('/courts/{slug}', { params: { path: { slug } } });

    return data as Court & ExtraCourtDetail;
  }
}
