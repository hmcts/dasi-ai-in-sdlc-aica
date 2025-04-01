
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';

const Start: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="govuk-width-container py-8 md:py-12">
          <div className="mb-6">
            <Link to="/" className="govuk-link inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {language === 'en' ? 'Back' : 'Yn ôl'}
            </Link>
          </div>
          
          <div className="md:grid md:grid-cols-3 gap-12">
            <div className="col-span-2">
              <h1 className="govuk-heading-xl">{getTranslation('findCourt', language)}</h1>
              <Link to="/know-name" className="govuk-button mt-6 inline-block">
                {getTranslation('continue', language)}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Start;
