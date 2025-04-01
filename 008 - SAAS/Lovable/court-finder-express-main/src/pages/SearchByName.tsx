
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBox from '../components/SearchBox';
import { LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';

const SearchByName: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="govuk-width-container py-8 md:py-12">
          <div className="mb-6">
            <Link to="/know-name" className="govuk-link inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {getTranslation('back', language)}
            </Link>
          </div>
          
          <div className="md:grid md:grid-cols-3 gap-12">
            <div className="col-span-2">
              <h1 className="govuk-heading-xl">{getTranslation('findCourt', language)}</h1>
              <p className="govuk-body">
                {language === 'en' 
                  ? 'Enter the name of the court or tribunal, or a town, city or postcode.' 
                  : 'Rhowch enw\'r llys neu dribiwnlys, neu dref, dinas neu god post.'}
              </p>
              <SearchBox />
            </div>
            <div className="hidden md:block mt-10">
              <div className="bg-govuk-light-grey p-6">
                <h2 className="govuk-heading-m">
                  {language === 'en' ? 'Other ways to contact us' : 'Ffyrdd eraill o gysylltu â ni'}
                </h2>
                <p className="govuk-body">
                  {language === 'en' 
                    ? 'If you need to speak to someone about a case, check your letter, email or text message from HM Courts and Tribunals Service (HMCTS) to find the right contact details.'
                    : 'Os oes angen i chi siarad â rhywun am achos, gwiriwch eich llythyr, e-bost neu neges destun gan Wasanaeth Llysoedd a Thribiwnlysoedd EM (HMCTS) i ddod o hyd i\'r manylion cyswllt cywir.'}
                </p>
                <p className="govuk-body">
                  {language === 'en'
                    ? 'Only contact the court or tribunal if you cannot find the information you need online.'
                    : 'Dim ond cysylltu â\'r llys neu dribiwnlys os na allwch ddod o hyd i\'r wybodaeth sydd ei hangen arnoch ar-lein.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchByName;
