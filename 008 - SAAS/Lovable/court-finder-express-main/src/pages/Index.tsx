
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';
import ReactMarkdown from 'react-markdown';

const Index: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="govuk-width-container py-8 md:py-12">
          <div className="md:grid md:grid-cols-3 gap-12">
            <div className="col-span-2">
              <h1 className="govuk-heading-xl">{getTranslation('findCourt', language)}</h1>
              
              <div className="govuk-body mb-8 space-y-4">
                <ReactMarkdown>
                  {getTranslation('description', language)}
                </ReactMarkdown>
              </div>
              
              <Link to="/know-name" className="govuk-button inline-block">
                {getTranslation('startNow', language)}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
