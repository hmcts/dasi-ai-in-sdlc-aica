// Simple i18n implementation for English and Welsh
export type Locale = "en" | "cy"

export const translations = {
  en: {
    // Home page
    "page.home.title": "Find a court or tribunal",
    "page.home.description": "Use this service to find a court or tribunal in England and Wales",
    "page.home.list.item1": "address",
    "page.home.list.item2": "contact details",
    "page.home.list.item3": "opening times",
    "page.home.list.item4": "building information e.g. disabled access or parking",
    "page.home.list.item5": "to help me get an update",
    "page.home.start": "Start now",
    "page.home.before": "Before you search",
    "page.home.welsh": "The online service is also available in Welsh (Cymraeg).",
    "page.home.northern":
      "You cannot use this service if you live in Northern Ireland. Contact the Northern Ireland Courts and Tribunals (opens in new tab) for help.",
    "page.home.fees": "You cannot use this service to pay court fees.",
    "page.home.scotland": "This service is limited in Scotland to:",
    "page.home.scotland.item1": "Immigration appeals",
    "page.home.scotland.item2": "Benefit appeals",
    "page.home.scotland.item3": "Employment claims appeals",
    "page.home.scotland.contact": "Contact the Scottish Courts and Tribunals (opens in new tab) for other services.",

    // Search options page
    "page.search-options.title": "Do you know the name of the court or tribunal?",
    "page.search-options.yes": "Yes, I have the name",
    "page.search-options.no": "No, I do not have the name",

    // Search purpose page
    "page.search-purpose.title": "What do you want to do?",
    "page.search-purpose.nearest": "Find the nearest court or tribunal",
    "page.search-purpose.documents": "Find a court or tribunal to send documents to",
    "page.search-purpose.update": "Contact a court or tribunal to get an update on your application",
    "page.search-purpose.other": "It is not listed here",

    // Category page
    "page.category.title": "What do you want to know more about?",
    "page.category.money.title": "Money",
    "page.category.money.description":
      "Money claims, rent or mortgage disputes, bankruptcy, job disputes related to pay, appealing a tax or benefits decision.",
    "page.category.probate.title": "Probate, divorce or ending civil partnerships",
    "page.category.probate.description": "Probate application and disputes, divorce, ending a civil partnership.",
    "page.category.childcare.title": "Childcare and parenting",
    "page.category.childcare.description":
      "Arrangements for looking after your children if you separate from your partner or making an adoption legal.",
    "page.category.harm.title": "Harm and abuse",
    "page.category.harm.description":
      "Applying for an injunction against someone who is harassing or abusing you, being made to marry against your will or preventing Female Genital Mutilation (FGM).",
    "page.category.immigration.title": "Immigration and asylum",
    "page.category.immigration.description": "Seeking asylum, right to live in the UK, and appealing deportation.",
    "page.category.crime.title": "Crime",
    "page.category.crime.description":
      "Single Justice Procedure and other criminal cases at a Crown or Magistrates' Court",
    "page.category.highcourt.title": "High Court district registries",
    "page.category.highcourt.description":
      "Courts that deal with the most serious and high profile cases in criminal and civil law.",
    "page.category.notfound": "I can't find what I'm looking for",

    // Money subcategory
    "page.money.title": "What kind of help do you need with money?",
    "page.money.claims": "Money claims",
    "page.money.claims.description": "Claims for when you are owed money or responding to money claims against you.",
    "page.money.probate": "Probate",
    "page.money.probate.description":
      "Applying for probate, storing a will, settlement and disputes over a deceased person's property, money and possessions.",
    "page.money.housing": "Housing",
    "page.money.housing.description": "Tenant evictions and rent or mortgage disputes.",
    "page.money.bankruptcy": "Bankruptcy",
    "page.money.bankruptcy.description":
      "Opposing a bankruptcy petition, support for a person at risk of violence order, cancelling a bankruptcy.",
    "page.money.benefits": "Benefits",
    "page.money.benefits.description":
      "Appealing entitlement to benefits such as Personal Independence Payment (PIP), Employment and Support Allowance (ESA) or Universal Credit.",
    "page.money.employment": "Claims against employers",
    "page.money.employment.description":
      "Appealing a decision about employment disputes related to pay, unfair dismissal and discrimination.",
    "page.money.tax": "Tax",
    "page.money.tax.description": "Appealing a tax decision.",
    "page.money.sjp": "Single Justice Procedure",
    "page.money.sjp.description": "T.V. Licensing and minor traffic offences such as speeding",

    // Probate subcategory
    "page.probate.title": "What kind of help do you need with probate, divorce or ending civil partnerships?",
    "page.probate.probate": "Probate",
    "page.probate.probate.description":
      "Applying for probate, storing a will, settlement and disputes over a deceased person's property, money and possessions.",
    "page.probate.divorce": "Divorce",
    "page.probate.divorce.description":
      "Ending a marriage, getting a legal separation or help with money, property and children during a divorce.",
    "page.probate.civil": "Civil partnership",
    "page.probate.civil.description": "Ending a civil partnership.",
    "page.probate.financial": "Financial remedy",
    "page.probate.financial.description": "Making an application to settle your finances following a divorce.",
    "page.probate.forced": "Forced marriage",
    "page.probate.forced.description": "Being made to marry against your will.",

    // Childcare subcategory
    "page.childcare.title": "What kind of help do you need with childcare and parenting?",
    "page.childcare.arrangements": "Childcare arrangements if you separate from your partner",
    "page.childcare.arrangements.description": "Making child arrangements if you divorce or separate.",
    "page.childcare.adoption": "Adoption",
    "page.childcare.adoption.description": "Support for a child adoption application.",

    // Harm subcategory
    "page.harm.title": "What kind of help do you need with harm and abuse?",
    "page.harm.fgm": "Female Genital Mutilation Protection Orders",
    "page.harm.fgm.description": "Support for legal protection for victims of female genital mutilation.",
    "page.harm.domestic": "Domestic abuse",
    "page.harm.domestic.description": "Support for an injunction if you've been the victim of domestic abuse.",
    "page.harm.forced": "Forced marriage",
    "page.harm.forced.description": "Being made to marry against your will.",

    // Immigration
    "page.immigration.title": "Immigration and asylum appeals",
    "page.immigration.description":
      "We manage immigration and asylum applications at our central service centre. Find where to send your documents or ask about your application's progress.",
    "page.immigration.center": "Immigration and Asylum Appeals Service Centre",
    "page.immigration.location": "This location provides services for all of England and Wales.",

    // Crime subcategory
    "page.crime.title": "What kind of help do you need with crime?",
    "page.crime.sjp": "Single Justice Procedure",
    "page.crime.sjp.description": "T.V. Licensing and minor traffic offences such as speeding",
    "page.crime.other": "Other criminal offences",
    "page.crime.other.description": "Criminal cases at a Crown or Magistrates' Court",

    // High Court
    "page.highcourt.title": "What is your postcode?",
    "page.highcourt.description":
      "We will use your postcode to show you the closest court or tribunal that deals with high court district registry to you.",
    "page.highcourt.postcode": "Enter your postcode",

    // Not found
    "page.notfound.title": "Sorry, we couldn't help you",
    "page.notfound.description":
      "If you have a letter, email or text from HM Courts and Tribunals Service (HMCTS), a court or a tribunal check it for contact details of the court or tribunal.",
    "page.notfound.nearest": "Find the nearest court or tribunal by postcode",
    "page.notfound.nearest.description": "Search for the nearest court or tribunal by postcode",
    "page.notfound.prefix": "Find a court by prefix (A - Z)",
    "page.notfound.prefix.description": "Search for a court by prefix (A - Z)",
    "page.notfound.fees": "Court and tribunal fees",
    "page.notfound.fees.description": "See how much you pay for your claim or case.",
    "page.notfound.forms": "Find court and tribunal paper forms",
    "page.notfound.forms.description":
      "Find court and tribunal forms, including divorce, probate, deed poll, money claim, help with fees and social security tribunal forms.",
    "page.notfound.all": "All HMCTS courts and tribunals",
    "page.notfound.all.description": "List of criminal, civil and family courts and tribunals in England and Wales.",

    // Postcode page
    "page.postcode.title": "What is your postcode?",
    "page.postcode.description": "We will use your postcode to show you the closest court or tribunal to you.",
    "page.postcode.label": "Enter your postcode",
    "page.postcode.error": "Please enter a postcode",

    // Search results
    "page.search.nearest": "Courts and tribunals nearest to",
    "page.search.found": "We found {count} courts or tribunals near your location.",
    "page.search.notfound": "We couldn't find any courts or tribunals near your location.",
    "page.search.try.again": "Try searching again using a different postcode.",

    // Common
    "common.back": "Back",
    "common.continue": "Continue",
    "common.error": "Please select an option",
    "common.language": "Cymraeg",
    "common.support": "Support",
    "common.help": "Help",
    "common.cookies": "Cookies",
    "common.contact": "Contact",
    "common.accessibility": "Accessibility statement",
    "common.legal": "Legal",
    "common.terms": "Terms and conditions",
    "common.privacy": "Privacy",
    "common.about": "About this service",
    "common.about.description": "This is a demonstration project and not an official government service.",
    "common.copyright": "© Crown copyright",
  },
  cy: {
    // Home page (Welsh translations)
    "page.home.title": "Dod o hyd i lys neu dribiwnlys",
    "page.home.description": "Defnyddiwch y gwasanaeth hwn i ddod o hyd i lys neu dribiwnlys yng Nghymru a Lloegr",
    "page.home.list.item1": "cyfeiriad",
    "page.home.list.item2": "manylion cyswllt",
    "page.home.list.item3": "amseroedd agor",
    "page.home.list.item4": "gwybodaeth am yr adeilad e.e. mynediad i'r anabl neu barcio",
    "page.home.list.item5": "i'm helpu i gael diweddariad",
    "page.home.start": "Dechrau nawr",
    "page.home.before": "Cyn i chi chwilio",
    "page.home.welsh": "Mae'r gwasanaeth ar-lein hefyd ar gael yn Saesneg (English).",
    "page.home.northern":
      "Ni allwch ddefnyddio'r gwasanaeth hwn os ydych yn byw yng Ngogledd Iwerddon. Cysylltwch â Llysoedd a Thribiwnlysoedd Gogledd Iwerddon (yn agor mewn tab newydd) am help.",
    "page.home.fees": "Ni allwch ddefnyddio'r gwasanaeth hwn i dalu ffioedd llys.",
    "page.home.scotland": "Mae'r gwasanaeth hwn yn gyfyngedig yn yr Alban i:",
    "page.home.scotland.item1": "Apeliadau mewnfudo",
    "page.home.scotland.item2": "Apeliadau budd-daliadau",
    "page.home.scotland.item3": "Apeliadau hawliadau cyflogaeth",
    "page.home.scotland.contact":
      "Cysylltwch â Llysoedd a Thribiwnlysoedd yr Alban (yn agor mewn tab newydd) ar gyfer gwasanaethau eraill.",

    // Search options page
    "page.search-options.title": "A ydych yn gwybod enw'r llys neu dribiwnlys?",
    "page.search-options.yes": "Ydw, mae gen i'r enw",
    "page.search-options.no": "Nac ydw, nid oes gennyf yr enw",

    // Search purpose page
    "page.search-purpose.title": "Beth ydych chi am ei wneud?",
    "page.search-purpose.nearest": "Dod o hyd i'r llys neu dribiwnlys agosaf",
    "page.search-purpose.documents": "Dod o hyd i lys neu dribiwnlys i anfon dogfennau ato",
    "page.search-purpose.update": "Cysylltu â llys neu dribiwnlys i gael diweddariad ar eich cais",
    "page.search-purpose.other": "Nid yw wedi'i restru yma",

    // Category page
    "page.category.title": "Am beth ydych chi am wybod mwy?",
    "page.category.money.title": "Arian",
    "page.category.money.description":
      "Hawliadau arian, anghydfodau rhent neu forgais, methdaliad, anghydfodau swydd yn ymwneud â thâl, apelio penderfyniad treth neu fudd-daliadau.",
    "page.category.probate.title": "Profiant, ysgariad neu ddiweddu partneriaethau sifil",
    "page.category.probate.description": "Cais profiant ac anghydfodau, ysgariad, diweddu partneriaeth sifil.",
    "page.category.childcare.title": "Gofal plant a magu plant",
    "page.category.childcare.description":
      "Trefniadau ar gyfer gofalu am eich plant os ydych yn gwahanu oddi wrth eich partner neu wneud mabwysiadu'n gyfreithiol.",
    "page.category.harm.title": "Niwed a cham-drin",
    "page.category.harm.description":
      "Gwneud cais am waharddeb yn erbyn rhywun sy'n eich aflonyddu neu'n eich cam-drin, cael eich gorfodi i briodi yn erbyn eich ewyllys neu atal Anffurfio Organau Cenhedlu Benywod (FGM).",
    "page.category.immigration.title": "Mewnfudo a lloches",
    "page.category.immigration.description": "Ceisio lloches, hawl i fyw yn y DU, ac apelio allgludiad.",
    "page.category.crime.title": "Trosedd",
    "page.category.crime.description":
      "Gweithdrefn Cyfiawnder Unigol a achosion troseddol eraill mewn Llys y Goron neu Lys Ynadon",
    "page.category.highcourt.title": "Cofrestrfeydd dosbarth yr Uchel Lys",
    "page.category.highcourt.description":
      "Llysoedd sy'n delio â'r achosion mwyaf difrifol a phroffil uchel mewn cyfraith droseddol a sifil.",
    "page.category.notfound": "Ni allaf ddod o hyd i'r hyn rwy'n chwilio amdano",

    // Postcode page (Welsh)
    "page.postcode.title": "Beth yw eich cod post?",
    "page.postcode.description": "Byddwn yn defnyddio'ch cod post i ddangos y llys neu dribiwnlys agosaf atoch chi.",
    "page.postcode.label": "Rhowch eich cod post",
    "page.postcode.error": "Rhowch god post",

    // Search results (Welsh)
    "page.search.nearest": "Llysoedd a thribiwnlysoedd agosaf at",
    "page.search.found": "Rydym wedi dod o hyd i {count} o lysoedd neu dribiwnlysoedd yn agos at eich lleoliad.",
    "page.search.notfound": "Ni allem ddod o hyd i unrhyw lysoedd neu dribiwnlysoedd yn agos at eich lleoliad.",
    "page.search.try.again": "Ceisiwch chwilio eto gan ddefnyddio cod post gwahanol.",

    // Common
    "common.back": "Yn ôl",
    "common.continue": "Parhau",
    "common.error": "Dewiswch opsiwn",
    "common.language": "English",
    "common.support": "Cymorth",
    "common.help": "Help",
    "common.cookies": "Cwcis",
    "common.contact": "Cyswllt",
    "common.accessibility": "Datganiad hygyrchedd",
    "common.legal": "Cyfreithiol",
    "common.terms": "Telerau ac amodau",
    "common.privacy": "Preifatrwydd",
    "common.about": "Am y gwasanaeth hwn",
    "common.about.description": "Mae hwn yn brosiect arddangos ac nid yn wasanaeth swyddogol y llywodraeth.",
    "common.copyright": "© Hawlfraint y Goron",
  },
}

// Helper function to get translation
export function getTranslation(locale: Locale, key: string, params?: Record<string, string | number>): string {
  let text = translations[locale][key] || key

  // Replace parameters if provided
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, String(value))
    })
  }

  return text
}

