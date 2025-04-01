
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourtCard from '../components/CourtCard';
import { Court, searchCourts } from '../data/courts';
import { useContext } from 'react';
import { LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';
import { useQuery } from '@tanstack/react-query';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { language } = useContext(LanguageContext);

  const { data: results = [], isLoading, error } = useQuery({
    queryKey: ['courts', query],
    queryFn: () => Promise.resolve(searchCourts(query)),
    enabled: query.length > 0,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="govuk-width-container py-8">
          <Link to="/search-by-name" className="govuk-link mb-6 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {getTranslation('back', language)}
          </Link>
          
          <h1 className="govuk-heading-xl">
            {language === 'en' ? 'Search results' : 'Canlyniadau chwilio'}
          </h1>
          
          <div className="bg-govuk-light-grey p-6 mb-8">
            <h2 className="govuk-heading-m">
              {language === 'en' ? `Search for '${query}'` : `Chwilio am '${query}'`}
            </h2>
            <p className="govuk-body">
              {language === 'en' 
                ? `We found ${results.length} ${results.length === 1 ? 'court or tribunal' : 'courts and tribunals'} matching your search.`
                : `Rydym wedi dod o hyd i ${results.length} ${results.length === 1 ? 'llys neu dribiwnlys' : 'llysoedd a thribiwnlysoedd'} sy'n cyfateb i'ch chwiliad.`}
            </p>
          </div>

          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-16 bg-govuk-light-grey rounded mb-4"></div>
              <div className="h-16 bg-govuk-light-grey rounded mb-4"></div>
              <div className="h-16 bg-govuk-light-grey rounded mb-4"></div>
            </div>
          ) : error ? (
            <div className="govuk-error-summary mb-6" role="alert">
              <h2 className="govuk-heading-m">
                {language === 'en' ? 'There was a problem' : 'Roedd problem'}
              </h2>
              <p className="govuk-body">
                {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </div>
          ) : results.length > 0 ? (
            <div>
              {results.map(court => (
                <CourtCard key={court.id} court={court} />
              ))}
            </div>
          ) : (
            <div className="animate-fade-in">
              <h2 className="govuk-heading-m">
                {language === 'en' ? 'No results found' : 'Dim canlyniadau wedi\'u canfod'}
              </h2>
              <p className="govuk-body">
                {language === 'en' 
                  ? 'Try another search or check your spelling.' 
                  : 'Ceisiwch chwiliad arall neu gwiriwch eich sillafu.'}
              </p>
              <p className="govuk-body">
                {language === 'en' 
                  ? 'You can also search for:' 
                  : 'Gallwch hefyd chwilio am:'}
              </p>
              <ul className="govuk-body list-disc pl-7 mb-6">
                <li>
                  {language === 'en' 
                    ? 'a court or tribunal name (for example, \'Bolton Court\')' 
                    : 'enw llys neu dribiwnlys (er enghraifft, \'Llys Bolton\')'}
                </li>
                <li>
                  {language === 'en' 
                    ? 'a town or city (for example, \'Manchester\')' 
                    : 'tref neu ddinas (er enghraifft, \'Manceinion\')'}
                </li>
                <li>
                  {language === 'en' 
                    ? 'a postcode (for example, \'L1 2XH\')' 
                    : 'cod post (er enghraifft, \'L1 2XH\')'}
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
