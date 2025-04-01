
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HighCourtPostcode: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postcode.trim()) {
      setError(language === 'en' 
        ? 'Please enter a postcode' 
        : 'Rhowch god post os gwelwch yn dda');
      return;
    }
    
    // Simple UK postcode validation
    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
    if (!postcodeRegex.test(postcode.trim())) {
      setError(language === 'en' 
        ? 'Enter a valid UK postcode' 
        : 'Rhowch god post DU dilys');
      return;
    }
    
    setError(null);
    navigate(`/search-results?q=${encodeURIComponent(postcode.trim())}`);
  };

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
          
          {error && (
            <div className="govuk-error-summary mb-6" role="alert">
              <h2 className="govuk-heading-m">
                {language === 'en' ? 'There is a problem' : 'Mae problem'}
              </h2>
              <div>
                <p className="govuk-body">{error}</p>
              </div>
            </div>
          )}
          
          <div className="md:grid md:grid-cols-3 gap-12">
            <div className="col-span-2">
              <h1 className="govuk-heading-l mb-6">
                {language === 'en' ? 'What is your postcode?' : 'Beth yw eich cod post?'}
              </h1>
              
              <p className="govuk-body mb-6">
                {language === 'en' 
                  ? 'We will use your postcode to show you the closest court or tribunal that deals with high court district registry to you.' 
                  : 'Byddwn yn defnyddio eich cod post i ddangos y llys neu dribiwnlys agosaf sy\'n delio â chofrestrfa dosbarth yr uchel lys i chi.'}
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="postcode" className="govuk-label">
                    {language === 'en' ? 'Enter your postcode' : 'Rhowch eich cod post'}
                  </label>
                  <Input
                    id="postcode"
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className={`govuk-input ${error ? 'border-govuk-red' : ''} max-w-[200px] uppercase`}
                    aria-describedby={error ? 'postcode-error' : undefined}
                  />
                  {error && (
                    <span id="postcode-error" className="text-govuk-red block mt-1">
                      {error}
                    </span>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="govuk-button"
                >
                  {language === 'en' ? 'Continue' : 'Parhau'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HighCourtPostcode;
