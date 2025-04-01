
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const ProbateDivorceOptions: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOption) {
      setError(language === 'en' 
        ? 'Please select an option' 
        : 'Dewiswch opsiwn os gwelwch yn dda');
      return;
    }
    
    setError(null);
    navigate('/search-by-name');
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
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className={`border-l-4 ${error ? 'border-govuk-red' : 'border-govuk-black'} pl-4`}>
                    <fieldset className="space-y-2">
                      <legend>
                        <h1 className="govuk-heading-l">
                          {language === 'en' 
                            ? 'What kind of help do you need with probate, divorce or ending civil partnerships?' 
                            : 'Pa fath o help sydd ei angen arnoch chi gyda phrofiant, ysgariad neu ddiweddu partneriaethau sifil?'}
                        </h1>
                      </legend>
                      
                      <RadioGroup 
                        value={selectedOption} 
                        onValueChange={setSelectedOption}
                        className="mt-4 space-y-3"
                      >
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="probate" id="probate" className="mt-1" />
                          <div>
                            <label htmlFor="probate" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Probate' : 'Profiant'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Applying for probate, storing a will, settlement and disputes over a deceased person\'s property, money and possessions.' 
                                : 'Gwneud cais am brofiant, storio ewyllys, setliad ac anghydfodau dros eiddo, arian ac eiddo person ymadawedig.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="divorce" id="divorce" className="mt-1" />
                          <div>
                            <label htmlFor="divorce" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Divorce' : 'Ysgariad'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Ending a marriage, getting a legal separation or help with money, property and children during a divorce.' 
                                : 'Diweddu priodas, cael gwahanu cyfreithiol neu help gydag arian, eiddo a phlant yn ystod ysgariad.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="civil-partnership" id="civil-partnership" className="mt-1" />
                          <div>
                            <label htmlFor="civil-partnership" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Civil partnership' : 'Partneriaeth sifil'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Ending a civil partnership.' 
                                : 'Diweddu partneriaeth sifil.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="financial-remedy" id="financial-remedy" className="mt-1" />
                          <div>
                            <label htmlFor="financial-remedy" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Financial remedy' : 'Rhwymedi ariannol'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Making an application to settle your finances following a divorce.' 
                                : 'Gwneud cais i setlo eich cyllid yn dilyn ysgariad.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="forced-marriage" id="forced-marriage" className="mt-1" />
                          <div>
                            <label htmlFor="forced-marriage" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Forced marriage' : 'Priodas dan orfod'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Being made to marry against your will.' 
                                : 'Cael eich gorfodi i briodi yn erbyn eich ewyllys.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="cannot-find" id="cannot-find" className="mt-1" />
                          <div>
                            <label htmlFor="cannot-find" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'I can\'t find what I\'m looking for' : 'Ni allaf ddod o hyd i\'r hyn rwy\'n chwilio amdano'}
                            </label>
                          </div>
                        </div>
                      </RadioGroup>
                    </fieldset>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="govuk-button mt-6"
                  >
                    {getTranslation('continue', language)}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProbateDivorceOptions;
