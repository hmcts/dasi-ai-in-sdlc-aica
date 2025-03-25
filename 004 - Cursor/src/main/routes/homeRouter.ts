import { factApiService } from '../factAPI';
import { CourtReference } from '../types/factApiTypes';

import express, { Router } from 'express';

// Create a router for the home routes
const homeRouter = Router();

// Define the root route handler
homeRouter.get('/', (req, res) => {
  res.render('home');
});

// Define the search option route handler
homeRouter.get('/search-option', (req, res) => {
  res.render('search/option');
});

// Handle the search option form submission
homeRouter.post('/search-option', (req, res) => {
  const option = req.body['court-or-tribunal'];
  
  switch (option) {
    case 'yes':
      res.redirect('/search-by-name');
      break;
    case 'no':
      res.redirect('/service-choose-action');
      break;
    default:
      res.redirect('/services/search-by-postcode');
  }
});

// Handle the search by name route
homeRouter.get('/search-by-name', (req, res) => {
  res.render('search/location');
});

// Handle the courts search route
homeRouter.get('/courts', async (req, res) => {
  let errorData = null;
  const searchQuery = req.query['search'] as string;
  let results: CourtReference[] = [];

  if (!searchQuery || searchQuery.trim() === '') {
    errorData = {
      title: 'There is a problem',
      text: 'Enter a court name, address, town or city'
    };
  } else if (searchQuery.trim().length < 3) {
    errorData = {
      title: 'There is a problem',
      text: 'Search must be 3 characters or more'
    };
  } else {
    try {
      // Call the FactAPI to get matching courts
      results = await factApiService.getCourts(searchQuery.trim());
    } catch (error) {
      console.error('Error searching for courts:', error);
      errorData = {
        title: 'There is a problem',
        text: 'Sorry, there was a problem with your search. Please try again.'
      };
    }
  }

  res.render('search/location', { 
    searchQuery,
    errorData,
    results
  });
});

// Handle viewing a specific court by slug
homeRouter.get('/courts/:slug', async (req, res) => {
  const slug = req.params.slug;
  const searchQuery = req.query.search as string || '';
  
  try {
    // Get the court details from the API
    const court = await factApiService.getCourtBySlug(slug);
    res.render('search/court-details', { court, searchQuery });
  } catch (error) {
    console.error(`Error fetching court details for slug ${slug}:`, error);
    res.status(404).render('not-found');
  }
});

// Handle the service choose action route
homeRouter.get('/service-choose-action', (req, res) => {
  res.render('choose-action');
});

// Handle the service choose action form submission
homeRouter.post('/service-choose-action', (req, res) => {
  const action = req.body['action'];
  
  if (['nearest', 'documents', 'update', 'not-listed'].includes(action)) {
    res.redirect('/services/' + action);
  } else {
    res.redirect('/service-choose-action');
  }
});

export default function (app: express.Application): void {
  app.use('/', homeRouter);
} 