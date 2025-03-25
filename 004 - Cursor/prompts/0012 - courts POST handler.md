## INPUT
Can you add a GET route handler for `/courts`. It needs to render the `search/location` template.

It will process a querystring parameter named `court-or-tribunal-name`.
* If there is no value for this query string parameter then error data should be passed to the view. The error data should have a title of `There is a problem` and supporting text of `Enter a court name, address, town or city`.
* If the value is too short (less than three characters) then error data should be passed to the view. The error data should have a title of `There is a problem` and supporting text of `Search must be 3 characters or more`.

## OUTPUT
ll add a POST route handler for /service-choose-action to handle the form submission based on the specified requirements. First, I notice that there's a discrepancy between the form in the template (which uses choose-action as the field name) and your requirements (which expect an action field). I'll update both the route handler and fix the template.
Now I need to update the choose-action.njk template to use 'action' as the field name instead of 'choose-action' and ensure the form method is correctly set to POST:
Perfect! I've made the following changes:
Added a POST route handler for /service-choose-action in the homeRouter.ts file that:
Extracts the value of the 'action' radio button from the request body
Redirects to '/services/{action}' when the action is one of 'nearest', 'documents', 'update', or 'not-listed'
Otherwise redirects back to '/service-choose-action'
Updated the choose-action.njk template to:
Change the form method from GET to POST
Change the radio button field name from 'choose-action' to 'action' to match what the route handler expects
Updated the idPrefix to 'action' for consistency
Now when users select an option on the "What do you want to do?" page and click "Continue", they will be redirected to the appropriate service page based on their selection.
Can you add a GET route handler for `/courts`. It needs to render the `search/location` template.

It will process a querystring parameter named `court-or-tribunal-name`.
* If there is no value for this query string parameter then error data should be passed to the view. The error data should have a title of `There is a problem` and supporting text of `Enter a court name, address, town or city`.
* If the value is too short (less than three characters) then error data should be passed to the view. The error data should have a title of `There is a problem` and supporting text of `Search must be 3 characters or more`.

I'll add a GET route handler for /courts that processes the query parameter and handles the specified error conditions.
Now I need to update the search/location.njk template to handle the error data and display appropriate error messages:
I've implemented the requested changes:
Added a GET route handler for /courts in the homeRouter.ts file that:
Extracts the 'search' query parameter from the request
Validates the search query based on the specified rules:
If the search query is empty, it sets an error message saying "Enter a court name, address, town or city"
If the search query is too short (less than 3 characters), it sets an error message saying "Search must be 3 characters or more"
Renders the 'search/location' template with the search query and any error data
Updated the search/location.njk template to:
Import the GOV.UK error summary component
Update the page title to include "Error: " prefix when there are errors
Display an error summary at the top of the page when errors are present
Pre-fill the search input with the previous search query value
Display an inline error message on the search input field
These changes implement proper form validation according to GOV.UK Design System guidelines, providing clear error messages to users when they submit an invalid search query.

## SUCCESS
YES

## RESULT
The route was added as specified with no problems.

-----

## OBSERVATIONS
* 1 out of 1 successful.
* Cursor also added error handling.
* In previous prompts I had selected the files to add to the context - in this prompt I intentionally didn't specify which files to modify. Cursor automatically selected them.