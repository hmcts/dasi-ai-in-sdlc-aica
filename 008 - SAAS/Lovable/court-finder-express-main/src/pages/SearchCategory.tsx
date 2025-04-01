
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const SearchCategory: React.FC = () => {
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
    
    // Navigate based on selection
    switch (selectedOption) {
      case 'money':
        navigate('/money-options');
        break;
      case 'probate-divorce':
        navigate('/probate-divorce-options');
        break;
      case 'childcare':
        navigate('/childcare-options');
        break;
      case 'harm-abuse':
        navigate('/harm-abuse-options');
        break;
      case 'immigration':
        navigate('/immigration-asylum');
        break;
      case 'crime':
        navigate('/crime-options');
        break;
      case 'high-court':
        navigate('/high-court-postcode');
        break;
      default:
        navigate('/search-by-name');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="govuk-width-container py-8 md:py-12">
          <div className="mb-6">
            <Link to="/search-purpose" className="govuk-link inline-flex items-center">
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
                          {language === 'en' ? 'What do you want to know more about?' : 'Am beth ydych chi am wybod mwy?'}
                        </h1>
                      </legend>
                      
                      <RadioGroup 
                        value={selectedOption} 
                        onValueChange={setSelectedOption}
                        className="mt-4 space-y-3"
                      >
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="money" id="money" className="mt-1" />
                          <div>
                            <label htmlFor="money" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Money' : 'Arian'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Money claims, rent or mortgage disputes, bankruptcy, job disputes related to pay, appealing a tax or benefits decision.' 
                                : 'Hawliadau arian, anghydfodau rhent neu forgais, methdaliad, anghydfodau swydd yn ymwneud â thâl, apelio penderfyniad treth neu fudd-daliadau.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="probate-divorce" id="probate-divorce" className="mt-1" />
                          <div>
                            <label htmlFor="probate-divorce" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Probate, divorce or ending civil partnerships' : 'Profiant, ysgariad neu ddiweddu partneriaethau sifil'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Probate application and disputes, divorce, ending a civil partnership.' 
                                : 'Cais profiant ac anghydfodau, ysgariad, diweddu partneriaeth sifil.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="childcare" id="childcare" className="mt-1" />
                          <div>
                            <label htmlFor="childcare" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Childcare and parenting' : 'Gofal plant a magu plant'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Arrangements for looking after your children if you separate from your partner or making an adoption legal.' 
                                : 'Trefniadau ar gyfer gofalu am eich plant os ydych chi\'n gwahanu oddi wrth eich partner neu wneud mabwysiadu\'n gyfreithiol.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="harm-abuse" id="harm-abuse" className="mt-1" />
                          <div>
                            <label htmlFor="harm-abuse" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Harm and abuse' : 'Niwed a cham-drin'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Applying for an injunction against someone who is harassing or abusing you, being made to marry against your will or preventing Female Genital Mutilation (FGM).' 
                                : 'Gwneud cais am waharddeb yn erbyn rhywun sy\'n eich aflonyddu neu\'n eich cam-drin, cael eich gorfodi i briodi yn erbyn eich ewyllys neu atal Anffurfio Organau Cenhedlu Benywaidd (FGM).'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="immigration" id="immigration" className="mt-1" />
                          <div>
                            <label htmlFor="immigration" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Immigration and asylum' : 'Mewnfudo a lloches'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Seeking asylum, right to live in the UK, and appealing deportation.' 
                                : 'Ceisio lloches, hawl i fyw yn y DU, ac apelio allgludiad.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="crime" id="crime" className="mt-1" />
                          <div>
                            <label htmlFor="crime" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'Crime' : 'Trosedd'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Single Justice Procedure and other criminal cases at a Crown or Magistrates\' Court' 
                                : 'Gweithdrefn Cyfiawnder Unigol ac achosion troseddol eraill mewn Llys y Goron neu Lys Ynadon'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="high-court" id="high-court" className="mt-1" />
                          <div>
                            <label htmlFor="high-court" className="font-medium cursor-pointer block">
                              {language === 'en' ? 'High Court district registries' : 'Cofrestrfeydd dosbarth yr Uchel Lys'}
                            </label>
                            <p className="text-gray-600">
                              {language === 'en' 
                                ? 'Courts that deal with the most serious and high profile cases in criminal and civil law.' 
                                : 'Llysoedd sy\'n delio â\'r achosion mwyaf difrifol ac uchel eu proffil mewn cyfraith droseddol a sifil.'}
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

export default SearchCategory;
