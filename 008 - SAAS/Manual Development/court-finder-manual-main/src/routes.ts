import { Application, Request, Response } from 'express';

export default function routes(app: Application): void {

  app.get('/search-by-name', (req: Request, res: Response) => {
    res.render('searchByName', {
        feedback: req.__('feedback'),
        languageToggle: req.__('languageToggle'),
        continueButton: req.__('continueButton'),
        serviceName: req.__('serviceName'),
        backLink: req.__('backLink'),
        findACourtInput: req.__('findACourtInput'),
        findACourtHint: req.__('findACourtHint'),
        findACourtPrompt:req.__('findACourtPrompt'),
        findACourtPromptHint:req.__('findACourtPromptHint'),
    });
  });

  app.get('/', (req, res) => {
    res.render('option', {
      feedback: req.__('feedback'),
      languageToggle: req.__('languageToggle'),
      cookieBannerH1: req.__('cookieBannerH1'),
      cookieBannerP1: req.__('cookieBannerP1'),
      cookieBannerP2: req.__('cookieBannerP2'),
      cookieBannerAcceptButton: req.__('cookieBannerAcceptButton'),
      cookieBannerRejectButton: req.__('cookieBannerRejectButton'),
      cookieBannerViewCookies: req.__('cookieBannerViewCookies'),
      cookieBannerHideButton: req.__('cookieBannerHideButton'),
      serviceName: req.__('serviceName'),
      backLink: req.__('backLink'),
      globals: { basePath: '' },
      heading: req.__('knowTheName'),
      caption: req.__('homePageCaption'),
      paragraph: req.__('homePageParagraph'),
      haveTheName: req.__('haveTheName'),
      dontHaveTheName: req.__('dontHaveTheName'),
      continueButton: req.__('continueButton'),
      hintText: req.__('hintText')
    });
  });

  app.post('/know-the-name', (req, res) => {
    console.log('POST /know-the-name called.');
    console.log('Form data:', req.body);

    const selection = req.body.knowTheName;

    if (selection === 'yes') {
      return res.redirect('/search-by-name');
    } else if (selection === 'no') {
      return res.redirect('/service-choose-action');
    }

    console.log('No valid selection. Redirecting to /error-or-some-default');
    return res.redirect('/error-or-some-default');
  });


  app.get('/', (req, res) => {
    console.log('GET /england-page (from know-the-name flow) called.');
    res.render('england');
  });

  app.get('/service-choose-action', (req, res) => {
    res.render('serviceChooseAction', {
        feedback: req.__('feedback'),
        languageToggle: req.__('languageToggle'),
        cookieBannerH1: req.__('cookieBannerH1'),
        cookieBannerP1: req.__('cookieBannerP1'),
        cookieBannerP2: req.__('cookieBannerP2'),
        cookieBannerAcceptButton: req.__('cookieBannerAcceptButton'),
        cookieBannerRejectButton: req.__('cookieBannerRejectButton'),
        cookieBannerViewCookies: req.__('cookieBannerViewCookies'),
        cookieBannerHideButton: req.__('cookieBannerHideButton'),
        serviceName: req.__('serviceName'),
        backLink: req.__('backLink'),
        globals: { basePath: '' },
        heading: req.__('knowTheName'),
        caption: req.__('homePageCaption'),
        paragraph: req.__('homePageParagraph'),
        haveTheName: req.__('haveTheName'),
        dontHaveTheName: req.__('dontHaveTheName'),
        continueButton: req.__('continueButton'),
        hintText: req.__('hintText'),
        findNearestCourt:req.__("findNearestCourt"),
        findCourtSendDocuments:req.__("findCourtSendDocuments"),
        contactCourtTribunal:req.__("contactCourtTribunal"),
        notListed:req.__("notListed"),
        whatDoYouWantToDo:req.__("whatDoYouWantToDo"),
        dividerText:req.__("dividerText")
      });
  });
}
