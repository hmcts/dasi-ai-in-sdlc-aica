## INPUT
Can you add a POST route handler for `/search-option`, the payload is JSON with the result from a single radio-button called `court-or-tribunal`.

When the value of `court-or-tribunal` is yes then it should redirect to `/search-by-name`.
When the value of `court-or-tribunal` is no then it should redirect to `/service-choose-action`.
Otherwise we should redirect to `/services/search-by-postcode`

## OUTPUT
Add a POST route handler for /search-option to handle the JSON payload and redirect based on the value of court-or-tribunal.

## SUCCESS
MIXED

## RESULT
The code was altered but the `court-or-tribunal` field name was assumed to be pascalCase, so the behviour didn't match the expected outcome.

-----

## INPUT
The courtOrTribunal value is not converted to pascalCase, you need to refer to its original kebab-case name (e.g. court-or-tribunal)

## OUTPUT
Update the POST route handler to use the original kebab-case name court-or-tribunal.

## SUCCESS
YES

## RESULT
The POST handler was updated successfully.

-----

## OBSERVATIONS
* 1 out of 2 successful.
* I am spending just as long to create a good prompt as I would to write the code-myself.


11 out of 26 so far