
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageContext } from '../../App';
import SearchResults from '../SearchResults';

// Mock the useSearchParams hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [
      { get: (key: string) => key === 'q' ? 'Manchester' : null }
    ]
  };
});

// Mock the searchCourts function
vi.mock('../../data/courts', () => {
  return {
    searchCourts: (query: string) => [
      {
        id: "1",
        slug: "manchester-civil-justice-centre",
        name: "Manchester Civil Justice Centre",
        address: ["1 Bridge Street", "Manchester"],
        town: "Manchester",
        postcode: "M60 9DJ",
        phoneNumber: "0161 830 5000",
        courtTypes: ["County Court", "Family Court"],
        areasOfLaw: ["Money claims", "Housing", "Divorce"]
      }
    ]
  };
});

describe('SearchResults Page', () => {
  it('renders search results correctly', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <LanguageContext.Provider value={{ language: 'en', setLanguage: vi.fn() }}>
          <BrowserRouter>
            <SearchResults />
          </BrowserRouter>
        </LanguageContext.Provider>
      </QueryClientProvider>
    );
    
    // Check that the page renders correctly
    expect(screen.getByText('Search results')).toBeInTheDocument();
    expect(screen.getByText(/Search for 'Manchester'/)).toBeInTheDocument();
    
    // Check that the court is displayed
    expect(await screen.findByText('Manchester Civil Justice Centre')).toBeInTheDocument();
  });
});
