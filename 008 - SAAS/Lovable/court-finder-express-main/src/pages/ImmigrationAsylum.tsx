
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';
import { Button } from "@/components/ui/button";

const ImmigrationAsylum: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="govuk-width-container py-8 md:py-12">
          <div className="mb-6">
            <Link to="/search-category" className="govuk-link inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {getTranslation('back', language)}
            </Link>
          </div>
          
          <div className="md:grid md:grid-cols-3 gap-12">
            <div className="col-span-2">
              <h1 className="govuk-heading-l">
                {language === 'en' ? 'Court or tribunal search results' : 'Canlyniadau chwilio llysoedd neu dribiwnlysoedd'}
              </h1>
              
              <p className="govuk-body">
                {language === 'en' 
                  ? 'We manage immigration and asylum applications at our central service centre. Find where to send your documents or ask about your application\'s progress.' 
                  : 'Rydym yn rheoli ceisiadau mewnfudo a lloches yn ein canolfan gwasanaeth ganolog. Dod o hyd i ble i anfon eich dogfennau neu ofyn am gynnydd eich cais.'}
              </p>
              
              <div className="bg-gray-100 p-6 mt-6 border-l-4 border-govuk-blue">
                <h2 className="govuk-heading-m">
                  {language === 'en' ? 'Immigration and Asylum Appeals Service Centre' : 'Canolfan Gwasanaeth Apeliadau Mewnfudo a Lloches'}
                </h2>
                <p className="govuk-body">
                  {language === 'en' 
                    ? 'This location provides services for all of England and Wales.' 
                    : 'Mae\'r lleoliad hwn yn darparu gwasanaethau ar gyfer Cymru a Lloegr i gyd.'}
                </p>
              </div>
              
              <div className="mt-6">
                <Link to="/search-by-name">
                  <Button className="govuk-button">
                    {getTranslation('continue', language)}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ImmigrationAsylum;
