## INPUT
We need a route handler to handle a GET request to the `/courts/:slug` route and respond with rendering the `court-details/not-in-person-court` template. The template will need data from the `FactAPI.getCourtBySlug` method.

The data from the `getCourtBySlug` method will need some alteration before being passed to the template:
* A `title` property should be added with `${courtDetails.name} - Find a Court or Tribunal - GOV.UK`
* The `image_file` property should have `https://factaat.blob.core.windows.net/images/` prepended to it
* If the property `courtDetails.service_centre.intro_paragraph` exists then the data should be updated with a property of `notInPersonP1` with the same value.
* If the property `courtDetails.service_centre.intro_paragraph` does not exist then the `notInPersonP1` property should equal `This location services all of England and Wales for ${courtDetails.areas_of_law.map(a => a.name).join(', ')}. We do not provide an in-person service.`;

If the data has a truthy value for `in_person` then we should render the template `court-details/in-person-court` instead of `court-details/not-in-person-court`

## OUTPUT
Add a new route handler for the /courts/:slug route to handle GET requests and render the appropriate template based on the in_person property.

## SUCCESS
YES

## RESULT
The correct result, first-time. Although failed on type-checking.
Manual intervention required to fix type-checking issue.

-----

## OBSERVATIONS
* 1 out of 1 successful.
* GitHub CoPilot can handle multiple tasks in one prompt.
* Lack of typing is a weakness.


30 out of 48 so far