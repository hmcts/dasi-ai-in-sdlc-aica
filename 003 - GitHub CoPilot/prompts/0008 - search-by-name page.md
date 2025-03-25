## INPUT
#codebase Please create a nunjucks View in a `./src/main/views/search/location` file - it should use the Gov UK styling and the page will ask the user "What is the name or address of the court or tribunal?"

## OUTPUT
Create a Nunjucks view that uses Gov UK styling and asks the user "What is the name or address of the court or tribunal?".

## SUCCESS
YES

## RESULT
It created a page as requested, along with a search box to enter the court name.

-----

## INPUT
Please can we alter the page so that:
* There is text under the heading of `The name of the court or tribunal can be found on a letter, email or text from us.`
* The `court-or-tribunal-name` text box has a heading of `Enter a court name, address, town or city`
* The `court-or-tribunal-name` text box has a sub-heading of  `For example, Blackburn Family Court.`
* The `form` element needs to POST to `/courts`

## OUTPUT
Update the page to include additional text under the heading, change the text box heading and sub-heading, and update the form action to POST to /courts.

## SUCCESS
YES

## RESULT
It made the changes as requested, but the text `Enter a court name, address, town or city` was not a header.

-----

## INPUT
The header of `Enter a court name, address, town or city` needs to be bigger

## OUTPUT
Update the header of Enter a court name, address, town or city to be larger.

## SUCCESS
NO

## RESULT
It added the class `govuk-heading-m` instead of `govuk-label--m`

-----

## INPUT
For the header of `Enter a court name, address, town or city` can we replace the class `govuk-heading-m` with `govuk-label--m`?

## OUTPUT


## SUCCESS
YES

## RESULT
The style was applied successfully.

-----

## OBSERVATIONS
* 3 out of 4 successful.
* I was surprised that it created the search-box without being prompted to do so.
* GitHub CoPilot has an understanding of the GovUK Styling system, but can easily get things wrong.


15 out of 31 so far