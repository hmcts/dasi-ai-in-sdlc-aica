
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const MoneyOptions: React.FC = () => {
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
                          {language === 'en' ? 'What kind of help do you need with money?' : 'Pa fath o help sydd ei angen arnoch chi gydag arian?'}
                        </h1>
                      </legend>
                      
                      <RadioGroup 
                        value={selectedOption} 
                        onValueChange={setSelectedOption}
                        className="mt-4 space-y-3"
                      >
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="money-claims" id="money-claims" className="mt-1" />
                          <div>
                            <label htmlFor="money-claims" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Money claims' : 'Hawliadau arian'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Claims for when you are owed money or responding to money claims against you.' 
                                : 'Hawliadau pan mae arian yn ddyledus i chi neu ymateb i hawliadau arian yn eich erbyn.'}
                            </p>
                          </div>
                        </div>
                        
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
                          <RadioGroupItem value="housing" id="housing" className="mt-1" />
                          <div>
                            <label htmlFor="housing" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Housing' : 'Tai'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Tenant evictions and rent or mortgage disputes.' 
                                : 'Troi tenantiaid allan ac anghydfodau rhent neu forgais.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="bankruptcy" id="bankruptcy" className="mt-1" />
                          <div>
                            <label htmlFor="bankruptcy" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Bankruptcy' : 'Methdaliad'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Opposing a bankruptcy petition, support for a person at risk of violence order, cancelling a bankruptcy.' 
                                : 'Gwrthwynebu deiseb methdaliad, cymorth i berson sydd mewn perygl o orchymyn trais, canslo methdaliad.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="benefits" id="benefits" className="mt-1" />
                          <div>
                            <label htmlFor="benefits" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Benefits' : 'Budd-daliadau'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Appealing entitlement to benefits such as Personal Independence Payment (PIP), Employment and Support Allowance (ESA) or Universal Credit.' 
                                : 'Apelio hawl i fudd-daliadau fel Taliad Annibyniaeth Personol (PIP), Lwfans Cyflogaeth a Chymorth (ESA) neu Gredyd Cynhwysol.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="claims-against-employers" id="claims-against-employers" className="mt-1" />
                          <div>
                            <label htmlFor="claims-against-employers" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Claims against employers' : 'Hawliadau yn erbyn cyflogwyr'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Appealing a decision about employment disputes related to pay, unfair dismissal and discrimination.' 
                                : 'Apelio penderfyniad am anghydfodau cyflogaeth yn ymwneud â thâl, diswyddo annheg a gwahaniaethu.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="tax" id="tax" className="mt-1" />
                          <div>
                            <label htmlFor="tax" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Tax' : 'Treth'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Appealing a tax decision.' 
                                : 'Apelio penderfyniad treth.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="sjp" id="sjp" className="mt-1" />
                          <div>
                            <label htmlFor="sjp" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Single Justice Procedure' : 'Gweithdrefn Cyfiawnder Unigol'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'T.V. Licensing and minor traffic offences such as speeding' 
                                : 'Trwyddedu Teledu a mân droseddau traffig fel goryrru'}
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

export default MoneyOptions;
