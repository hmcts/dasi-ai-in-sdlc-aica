## INPUT
* We need a route handler to handle a GET request to the `/search-by-name` route and respond with rendering the `search/location` template.
* We need a route handler to handle a GET request to the `/service-choose-action` route and respond with rendering the `choose-action` template.

## OUTPUT
I'll add the two requested route handlers to the homeRouter.ts file:
Now let's create the required template files:
I've successfully implemented all the requested changes:
Added two new route handlers to the homeRouter.ts file:
A GET handler for /search-by-name that renders the search/location template
A GET handler for /service-choose-action that renders the choose-action template
Created the necessary template files:
src/main/views/search/location.njk for the search by name functionality
src/main/views/choose-action.njk for the service choose action functionality
Both template files follow the GOV.UK Design System patterns and include:
Proper page titles
Back links to navigate to the previous page
Appropriate form elements (input field for search, radio buttons for options)
Submit buttons styled according to GOV.UK design patterns
The navigation flow now works as follows:
User starts on the home page and clicks "Start now"
User selects whether they know the name of the court on the search-option page
If "I have the name" is selected, they're redirected to the search-by-name page
If "I do not have the name" is selected, they're redirected to the service-choose-action page
All the templates and routes are now properly wired up to handle the user journey.

## SUCCESS
YES

## RESULT
Created the correct route-handlers and their templates

-----

## OBSERVATIONS
* 1 out of 1 successful.


