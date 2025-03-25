## INPUT
In the GET route handler for the `/courts/:slug` route the data from the `getCourtBySlug` method needs some alteration before being passed to the template:

* A `title` property should be added with `${courtDetails.name} - Find a Court or Tribunal - GOV.UK`
* The `image_file` property should have `https://factaat.blob.core.windows.net/images/` prepended to it
* If the property `courtDetails.service_centre.intro_paragraph` exists then the data should be updated with a property of `notInPersonP1` with the same value.
* If the property `courtDetails.service_centre.intro_paragraph` does not exist then the `notInPersonP1` property should equal `This location services all of England and Wales for ${courtDetails.areas_of_law.map(a => a.name).join(', ')}. We do not provide an in-person service.`;

If the data has a truthy value for `in_person` then we should render the template `court-details/in-person-court` instead of `court-details/not-in-person-court`

## OUTPUT
I need to modify the GET route handler for the /courts/:slug route to alter the data from the getCourtBySlug method before passing it to the template. Let me first understand the current implementation by examining the relevant files.

First, I'll look at the search routes file to find the current implementation of the /courts/:slug route handler:


Cline wants to read this file:


Now I can see the current implementation of the /courts/:slug route handler. I need to modify it to alter the data from the getCourtBySlug method before passing it to the template according to the requirements.

Let me also check the factAPI.ts file to understand the structure of the data returned by the getCourtBySlug method:


Cline wants to read this file:


Now I have a better understanding of the data structure returned by the getCourtBySlug method. Let me also check the current court-details.njk template to understand how the data is being used:


Cline wants to read this file:


Now I need to check if the templates for in-person and not-in-person courts exist. Let me check if they exist in the project:


Cline viewed the top level files in this directory:


I see that the templates for in-person and not-in-person courts don't exist yet. According to the task, I need to:

Modify the GET route handler for /courts/:slug to alter the data from the getCourtBySlug method before passing it to the template.
Render different templates based on the in_person property.
Let me first create the two templates needed:

court-details/in-person-court.njk
court-details/not-in-person-court.njk
I'll create these templates based on the existing court-details.njk template.

First, I'll create the directory structure:


Cline wants to execute this command:
mkdir -p src/main/views/search/court-details

Checkpoint
Compare
Restore


Now I'll create the in-person-court.njk template based on the existing court-details.njk template:


Cline wants to create a new file:

Checkpoint
Compare
Restore


Now I'll create the not-in-person-court.njk template, which will be similar but will include the notInPersonP1 content:


Cline wants to create a new file:

Checkpoint
Compare
Restore


Now I need to update the GET route handler for the /courts/:slug route to:

Add a title property with ${courtDetails.name} - Find a Court or Tribunal - GOV.UK
Prepend https://factaat.blob.core.windows.net/images/ to the image_file property
Set the notInPersonP1 property based on whether courtDetails.service_centre.intro_paragraph exists
Render different templates based on the in_person property
Let me update the route handler:


Cline wants to edit this file:

Checkpoint
Compare
Restore


I need to update the Court interface in factAPI.ts to include the properties we're using in the route handler. Let's update the interface:


Cline wants to edit this file:

Checkpoint
Compare
Restore


Let's fix the ESLint errors by replacing the any type with more specific types:


Cline wants to edit this file:

Checkpoint
Compare
Restore


Now I need to fix the TypeScript error in the route handler. The error is related to the map function on courtDetails.areas_of_law. Let's update the route handler to add type annotations:


Cline wants to edit this file:

Checkpoint
Compare
Restore


Now I need to update the template.njk file to use the title property we've added to the court details. Let me check the current template.njk file:


Cline wants to read this file:


I need to update the template.njk file to use the title property we've added to the court details. Let me add a title block to the template:


Cline wants to edit this file:

Checkpoint
Compare
Restore


Now I've completed all the required changes:

Created two new templates:

src/main/views/search/court-details/in-person-court.njk
src/main/views/search/court-details/not-in-person-court.njk
Updated the Court interface in factAPI.ts to include the new properties:

title
image_file
notInPersonP1
service_centre
areas_of_law
Modified the GET route handler for /courts/:slug to:

Add a title property with ${courtDetails.name} - Find a Court or Tribunal - GOV.UK
Prepend https://factaat.blob.core.windows.net/images/ to the image_file property
Set the notInPersonP1 property based on whether courtDetails.service_centre.intro_paragraph exists
Render different templates based on the in_person property
Updated the template.njk file to use the title property for the page title

Let me verify that all the requirements have been met:

✅ Added title property with ${courtDetails.name} - Find a Court or Tribunal - GOV.UK
✅ Prepended https://factaat.blob.core.windows.net/images/ to the image_file property
✅ Set notInPersonP1 property based on courtDetails.service_centre.intro_paragraph
✅ Rendered different templates based on the in_person property
All requirements have been met. Let me summarize the changes for the user.


Task Completed
I've implemented the requested changes to the GET route handler for the /courts/:slug route:

Updated the Court interface in factAPI.ts to include the new properties needed for the data alterations.

Modified the GET route handler in search.ts to:

Add a title property with the format ${courtDetails.name} - Find a Court or Tribunal - GOV.UK
Prepend https://factaat.blob.core.windows.net/images/ to the image_file property when it exists
Set the notInPersonP1 property based on whether courtDetails.service_centre.intro_paragraph exists
Render different templates based on the in_person property
Created two new templates:

src/main/views/search/court-details/in-person-court.njk - Used when in_person is truthy
src/main/views/search/court-details/not-in-person-court.njk - Used when in_person is falsy
The not-in-person template includes a section to display the notInPersonP1 content.

Updated template.njk to use the new title property for the page title.

These changes ensure that court details are properly formatted before being passed to the templates, and that the appropriate template is rendered based on the in_person property.

## SUCCESS
YES

## RESULT
Cline made the changes as requested

-----

## INPUT


## OUTPUT


## SUCCESS


## RESULT


-----

## INPUT


## OUTPUT


## SUCCESS


## RESULT


-----

## OBSERVATIONS
* 1 out of 1 successful
* Cline updated the types.
* 