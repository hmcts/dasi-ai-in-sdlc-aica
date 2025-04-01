
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';

const Footer: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <footer className="bg-govuk-light-grey mt-12 py-8 border-t-2 border-govuk-blue">
      <div className="govuk-width-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="govuk-heading-m">
              {language === 'en' ? 'Support links' : 'Dolenni cymorth'}
            </h2>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="govuk-link">
                  {language === 'en' ? 'Help' : 'Cymorth'}
                </Link>
              </li>
              <li>
                <Link to="#" className="govuk-link">
                  {language === 'en' ? 'Cookies' : 'Cwcis'}
                </Link>
              </li>
              <li>
                <Link to="#" className="govuk-link">
                  {language === 'en' ? 'Contact' : 'Cysylltu'}
                </Link>
              </li>
              <li>
                <Link to="#" className="govuk-link">
                  {language === 'en' ? 'Terms and conditions' : 'Telerau ac amodau'}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="govuk-heading-m">
              {language === 'en' ? 'Related services' : 'Gwasanaethau cysylltiedig'}
            </h2>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="govuk-link">
                  {language === 'en' ? 'Court and tribunal hearings' : 'Gwrandawiadau llys a thribiwnlys'}
                </Link>
              </li>
              <li>
                <Link to="#" className="govuk-link">
                  {language === 'en' ? 'Pay a court fine' : 'Talu dirwy llys'}
                </Link>
              </li>
              <li>
                <Link to="#" className="govuk-link">
                  {language === 'en' ? 'Apply for probate' : 'Gwneud cais am brofiant'}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="govuk-heading-m">
              {language === 'en' ? 'About this service' : 'Am y gwasanaeth hwn'}
            </h2>
            <p className="govuk-body">
              {language === 'en' 
                ? 'This is a demonstration website simulating the GOV.UK court finder service.' 
                : 'Mae hon yn wefan arddangos sy\'n efelychu gwasanaeth darganfod llys GOV.UK.'}
            </p>
            <p className="govuk-body">
              {language === 'en'
                ? 'Built as a coding exercise.' 
                : 'Wedi\'i adeiladu fel ymarfer codio.'}
            </p>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 border-govuk-mid-grey">
          <p className="govuk-body text-sm">
            {language === 'en' 
              ? 'All content is available under the ' 
              : 'Mae\'r holl gynnwys ar gael o dan y '}
            <Link to="#" className="govuk-link">
              {language === 'en' ? 'Open Government Licence v3.0' : 'Drwydded Llywodraeth Agored v3.0'}
            </Link>
            {language === 'en' ? ', except where otherwise stated' : ', ac eithrio lle nodir yn wahanol'}
          </p>
          <p className="govuk-body text-sm">© Crown copyright</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
