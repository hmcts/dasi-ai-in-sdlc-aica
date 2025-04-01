
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';

const SearchBox: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError(language === 'en' 
        ? 'Please enter a town, city or postcode' 
        : 'Rhowch dref, dinas neu god post');
      return;
    }
    
    setError('');
    navigate(`/search-results?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="bg-govuk-light-grey p-6 md:p-8 animate-fade-in">
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
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="search-input" className="govuk-label">
            {getTranslation('enterTownCity', language)}
          </label>
          <input
            type="text"
            id="search-input"
            name="search"
            className={`govuk-input ${error ? 'border-govuk-red' : ''}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-describedby={error ? 'search-error' : undefined}
          />
          {error && (
            <span id="search-error" className="text-govuk-red block mt-1">
              {error}
            </span>
          )}
        </div>
        <button type="submit" className="govuk-button">
          {language === 'en' ? 'Find' : 'Dod o hyd'}
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
