
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';

const Header: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cy' : 'en');
  };

  return (
    <header className="bg-govuk-black">
      <div className="govuk-width-container py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center focus:outline-none focus:bg-govuk-yellow">
            <div className="mr-2 bg-white p-1 flex items-center justify-center">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm8 16c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm-5.3 0c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7z"
                  fill="#000"
                ></path>
              </svg>
            </div>
            <span className="text-white font-bold text-lg md:text-xl">GOV.UK</span>
          </Link>
          <button 
            onClick={toggleLanguage}
            className="text-white hover:underline focus:outline-none focus:bg-govuk-yellow focus:text-govuk-black px-2 py-1"
          >
            {language === 'en' ? 'Cymraeg' : 'English'}
          </button>
        </div>
      </div>
      <div className="bg-govuk-blue">
        <div className="govuk-width-container py-2 text-white">
          <Link to="/" className="text-white hover:underline focus:outline-none focus:bg-govuk-yellow focus:text-govuk-black">
            {language === 'en' ? 'Find a court or tribunal' : 'Dod o hyd i lys neu dribiwnlys'}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
