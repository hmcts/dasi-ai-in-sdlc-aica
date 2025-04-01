
import { LanguageType } from '../App';

type TranslationKey = 
  | 'findCourt'
  | 'startNow'
  | 'description' 
  | 'knowNameTitle'
  | 'knowNameSubtitle'
  | 'haveTheName'
  | 'doNotHaveTheName'
  | 'whatDoYouWantToDo'
  | 'findNearest'
  | 'findToSendDocuments'
  | 'contactForUpdate'
  | 'notListed'
  | 'continue'
  | 'back'
  | 'enterTownCity'
  | 'whatDoYouWantToKnow';

const translations: Record<TranslationKey, Record<LanguageType, string>> = {
  findCourt: {
    en: 'Find a court or tribunal',
    cy: 'Dod o hyd i lys neu dribiwnlys'
  },
  startNow: {
    en: 'Start now >',
    cy: 'Dechrau nawr >'
  },
  description: {
    en: 'Find contact details and information on courts and tribunals in England and Wales, and some non-devolved tribunals in Scotland.\n\nYou can find the following details:\n\n* address\n* contact details\n* opening times\n* how to get to the court or tribunal\n* the areas of law it covers\n* disabled access to the building.',
    cy: 'Dod o hyd i fanylion cyswllt a gwybodaeth am lysoedd a thribiwnlysoedd yng Nghymru a Lloegr, a rhai tribiwnlysoedd nad ydynt wedi\'u datganoli yn yr Alban.\n\nGallwch ddod o hyd i\'r manylion canlynol:\n\n* cyfeiriad\n* manylion cyswllt\n* amseroedd agor\n* sut i gyrraedd y llys neu dribiwnlys\n* y meysydd cyfreithiol y mae\'n eu cwmpasu\n* mynediad i bobl anabl i\'r adeilad.'
  },
  knowNameTitle: {
    en: 'Do you know the name of the court or tribunal?',
    cy: 'A ydych chi\'n gwybod enw\'r llys neu dribiwnlys?'
  },
  knowNameSubtitle: {
    en: 'The name of the court or tribunal can be found on a letter, email or text from us.',
    cy: 'Gellir dod o hyd i enw\'r llys neu dribiwnlys ar lythyr, e-bost neu neges destun gennym.'
  },
  haveTheName: {
    en: 'I have the name',
    cy: 'Mae gen i\'r enw'
  },
  doNotHaveTheName: {
    en: 'I do not have the name',
    cy: 'Nid oes gennyf yr enw'
  },
  whatDoYouWantToDo: {
    en: 'What do you want to do?',
    cy: 'Beth ydych chi am ei wneud?'
  },
  findNearest: {
    en: 'Find the nearest court or tribunal',
    cy: 'Dewch o hyd i\'r llys neu dribiwnlys agosaf'
  },
  findToSendDocuments: {
    en: 'Find a court or tribunal to send documents to',
    cy: 'Dewch o hyd i lys neu dribiwnlys i anfon dogfennau ato'
  },
  contactForUpdate: {
    en: 'Contact a court or tribunal to get an update on your application',
    cy: 'Cysylltwch â llys neu dribiwnlys i gael diweddariad ar eich cais'
  },
  notListed: {
    en: 'It is not listed here',
    cy: 'Nid yw wedi\'i restru yma'
  },
  continue: {
    en: 'Continue',
    cy: 'Parhau'
  },
  back: {
    en: 'Back',
    cy: 'Yn ôl'
  },
  enterTownCity: {
    en: 'Enter a town, city or postcode',
    cy: 'Rhowch dref, dinas neu god post'
  },
  whatDoYouWantToKnow: {
    en: 'What do you want to know more about?',
    cy: 'Am beth ydych chi am wybod mwy?'
  }
};

export const getTranslation = (key: TranslationKey, language: LanguageType): string => {
  return translations[key][language];
};
