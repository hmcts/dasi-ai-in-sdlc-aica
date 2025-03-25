import { Application } from 'express';
import { factApiService } from '../factAPI';

export default function (app: Application): void {
  app.get('/search-option', (req, res) => {
    res.render('search/option');
  });

  app.post('/search-option', (req, res) => {
    const searchOption = req.body.searchOption;
    
    if (searchOption === 'yes') {
      // User has the name - redirect to name search page (to be implemented)
      res.redirect('/search-by-name');
    } else if (searchOption === 'no') {
      // User doesn't have the name - redirect to location search page (to be implemented)
      res.redirect('/service-choose-action');
    } else {
      // No option selected - redisplay the form with an error
      res.render('search/option', {
        error: 'Please select an option',
        previousValues: req.body
      });
    }
  });

  // Handler for the search-by-name route
  app.get('/search-by-name', (req, res) => {
    res.render('search/location');
  });

  // Handler for the service-choose-action route
  app.get('/service-choose-action', (req, res) => {
    res.render('choose-action');
  });

  // POST handler for the service-choose-action route
  app.post('/service-choose-action', (req, res) => {
    const action = req.body.action;
    
    if (!action) {
      // No option selected - redisplay the form with an error
      return res.render('choose-action', {
        error: 'Please select an option',
        previousValues: req.body
      });
    }
    
    // Redirect based on the selected action
    switch (action) {
      case 'nearest':
        res.redirect('/search-by-location');
        break;
      case 'documents':
        res.redirect('/search-by-name');
        break;
      case 'update':
        res.redirect('/update-application');
        break;
      case 'not-listed':
        res.redirect('/not-listed');
        break;
      default:
        res.redirect('/');
    }
  });

  // Handler for the courts search results
  app.get('/courts', async (req, res) => {
    const courtName = req.query.courtName as string | undefined;
    
    // Check for errors
    if (!courtName) {
      // No court name provided
      return res.render('search/location', {
        error: 'Enter a court name, address, town or city',
        errorTitle: 'There is a problem',
        previousValues: {
          courtName: ''
        }
      });
    }
    
    if (courtName.length < 3) {
      // Court name too short
      return res.render('search/location', {
        error: 'Search must be 3 characters or more',
        errorTitle: 'There is a problem',
        previousValues: {
          courtName: courtName
        }
      });
    }
    
    try {
      // Call the FACT API to search for courts
      const searchResponse = await factApiService.searchCourts({ q: courtName });
      
      // Render the search/location template with the search results
      res.render('search/location', { 
        query: courtName,
        results: searchResponse.courts,
        previousValues: {
          courtName: courtName
        }
      });
    } catch (error) {
      console.error('Error searching courts:', error);
      // In case of API error, show a generic error message
      res.render('search/location', {
        error: 'Sorry, there was a problem with the search. Please try again later.',
        errorTitle: 'There is a problem',
        previousValues: {
          courtName: courtName
        }
      });
    }
  });

  // Handler for the court details page
  app.get('/courts/:slug', async (req, res) => {
    const { slug } = req.params;
    
    try {
      // Fetch court details using the slug
      const courtDetails = await factApiService.getCourtBySlug(slug);
      
      if (!courtDetails) {
        // Court not found
        return res.status(404).render('error', {
          error: {
            status: 404,
            message: 'Court not found'
          }
        });
      }
      
      // Prepare the data for the template
      const templateData = {
        ...courtDetails,
        title: `${courtDetails.name} - Find a Court or Tribunal - GOV.UK`
      };
      
      // Add image URL prefix if image_file exists
      if (templateData.image_file) {
        templateData.image_file = `https://factaat.blob.core.windows.net/images/${templateData.image_file}`;
      }
      
      // Set the notInPersonP1 property based on service_centre.intro_paragraph
      if (courtDetails.service_centre?.intro_paragraph) {
        templateData.notInPersonP1 = courtDetails.service_centre.intro_paragraph;
      } else if (courtDetails.areas_of_law && courtDetails.areas_of_law.length > 0) {
        const areasList = courtDetails.areas_of_law.map(a => a.name).join(', ');
        templateData.notInPersonP1 = `This location services all of England and Wales for ${areasList}. We do not provide an in-person service.`;
      }
      
      // Choose the template based on inPerson flag
      const template = courtDetails.inPerson 
        ? 'court-details/in-person-court' 
        : 'court-details/not-in-person-court';
      
      // Render the appropriate template with the data
      res.render(template, templateData);
    } catch (error) {
      console.error(`Error fetching court details for slug ${slug}:`, error);
      res.status(500).render('error', {
        error: {
          status: 500,
          message: 'Sorry, there was a problem retrieving the court details. Please try again later.'
        }
      });
    }
  });
}
