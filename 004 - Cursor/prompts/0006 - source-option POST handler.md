## INPUT
Can you add a POST route handler for `/search-option`, the payload is JSON with the result from a single radio-button called `court-or-tribunal`.

When the value of `court-or-tribunal` is yes then it should redirect to `/search-by-name`.
When the value of `court-or-tribunal` is no then it should redirect to `/service-choose-action`.
Otherwise we should redirect to `/services/search-by-postcode`

## OUTPUT
I'll add a POST route handler for /search-option to handle the form submission. Let me update the homeRouter.ts file:
Now I need to update the form in the option.njk template to use 'court-or-tribunal' as the field name instead of 'searchOption':
Perfect! I've made the following changes:
Added a POST route handler for /search-option in the homeRouter.ts file that:
Extracts the value of the 'court-or-tribunal' radio button from the request body
Redirects to /search-by-name when the value is 'yes'
Redirects to /service-choose-action when the value is 'no'
Redirects to /services/search-by-postcode for any other value (default case)
Updated the search/option.njk template to:
Use 'court-or-tribunal' as both the idPrefix and name for the radio button group
This ensures the form data will be submitted with the correct field name that the POST handler is expecting
Now when users select an option and click "Continue", they will be redirected to the appropriate page based on their selection.

## SUCCESS
YES

## RESULT
The POST handler was updated successfully.

-----

## OBSERVATIONS
* 1 out of 1 successful.
* 

