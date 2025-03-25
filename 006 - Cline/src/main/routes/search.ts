import factApi from '../factAPI';

import { Application } from 'express';

export default function (app: Application): void {
  app.get('/search-option', (req, res) => {
    res.render('search/option');
  });

  app.post('/search-option', (req, res) => {
    const { 'know-name': knowName } = req.body;

    if (knowName === 'yes') {
      return res.redirect('/search-by-name');
    } else if (knowName === 'no') {
      return res.redirect('/service-choose-action');
    } else {
      return res.redirect('/services/search-by-postcode');
    }
  });

  app.get('/search-by-name', (req, res) => {
    res.render('search/location');
  });

  app.get('/service-choose-action', (req, res) => {
    res.render('choose-action');
  });

  app.post('/service-choose-action', (req, res) => {
    const { action } = req.body;
    
    if (['nearest', 'documents', 'update', 'not-listed'].includes(action)) {
      return res.redirect('/services/' + action);
    } else {
      return res.redirect('/service-choose-action');
    }
  });

  app.get('/courts', async (req, res) => {
    const location = req.query.location as string;
    
    // Validation
    if (!location) {
      return res.render('search/location', {
        error: {
          title: 'There is a problem',
          text: 'Enter a court name, address, town or city'
        }
      });
    }
    
    if (location.length < 3) {
      return res.render('search/location', {
        error: {
          title: 'There is a problem',
          text: 'Search must be 3 characters or more'
        },
        location
      });
    }
    
    try {
      // Call the fact-api service to search for courts
      const courts = await factApi.searchCourts(location);
      
      // Render the template with the search results
      return res.render('search/location', { 
        location,
        courts
      });
    } catch (error) {
      console.error('Error searching courts:', error);
      return res.render('search/location', {
        error: {
          title: 'There is a problem',
          text: 'Error searching for courts. Please try again later.'
        },
        location
      });
    }
  });

  app.get('/courts/:slug', async (req, res) => {
    const { slug } = req.params;
    
    try {
      // Call the fact-api service to get court details
      const courtDetails = await factApi.getCourtBySlug(slug);
      
      // Add a title property
      courtDetails.title = `${courtDetails.name} - Find a Court or Tribunal - GOV.UK`;
      
      // Prepend the image URL if it exists
      if (courtDetails.image_file) {
        courtDetails.image_file = `https://factaat.blob.core.windows.net/images/${courtDetails.image_file}`;
      }
      
      // Set the notInPersonP1 property based on service_centre.intro_paragraph
      if (courtDetails.service_centre && courtDetails.service_centre.intro_paragraph) {
        courtDetails.notInPersonP1 = courtDetails.service_centre.intro_paragraph;
      } else if (courtDetails.areas_of_law && courtDetails.areas_of_law.length > 0) {
        const areasOfLaw = courtDetails.areas_of_law.map((a: { name: string }) => a.name).join(', ');
        courtDetails.notInPersonP1 = `This location services all of England and Wales for ${areasOfLaw}. We do not provide an in-person service.`;
      }
      
      // Render the appropriate template based on in_person property
      const templatePath = courtDetails.in_person 
        ? 'search/court-details/in-person-court' 
        : 'search/court-details/not-in-person-court';
      
      return res.render(templatePath, { court: courtDetails });
    } catch (error) {
      console.error(`Error getting court details for slug ${slug}:`, error);
      return res.render('error', {
        error: {
          title: 'There is a problem',
          text: 'Error retrieving court details. Please try again later.'
        }
      });
    }
  });
}
