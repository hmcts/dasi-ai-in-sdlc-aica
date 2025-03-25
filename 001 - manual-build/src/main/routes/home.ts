import { ActionTypes, ChooseActionRequest, SearchOptionRequest } from '../types/dtos';

import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.render('home');
});

router.get('/search-option', (_req, res) => {
  res.render('search/option');
});

router.post<unknown, unknown, SearchOptionRequest>('/search-option', (req, res) => {
  const {
    body: { knowLocation },
  } = req;

  if (knowLocation === 'yes') {
    return res.redirect('/search-by-name');
  } else if (knowLocation === 'no') {
    return res.redirect('/service-choose-action');
  }

  res.redirect('/services/search-by-postcode');
});

router.get('/search-by-name', (_req, res) => {
  res.render('search/location');
});

router.get('/service-choose-action', (_req, res) => {
  res.render('choose-action');
});

router.post<unknown, unknown, ChooseActionRequest>('/service-choose-action', (req, res) => {
  const action = req.body.chooseAction;

  if (!action || !ActionTypes.includes(action)) {
    return res.redirect('/service-choose-action');
  }

  res.redirect('/services/' + action);
});

export default router;
