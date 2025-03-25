## INPUT
Can we alter the `form` element to perform a GET action instead of a POST

## OUTPUT
Change the form element to perform a GET action instead of a POST.

## SUCCESS
YES

## RESULT
The page was updated as expected.

-----

## INPUT
Can you add a GET route handler for `/courts`. It needs to render the `search/location` template.

It will process a querystring parameter named `court-or-tribunal-name`.
* If there is no value for this query string parameter then error data should be passed to the view. The error data should have a title of `There is a problem` and supporting text of `Enter a court name, address, town or city`.
* If the value is too short (less than three characters) then error data should be passed to the view. The error data should have a title of `There is a problem` and supporting text of `Search must be 3 characters or more`.

## OUTPUT
Add a new GET route handler for /courts that processes the court-or-tribunal-name query string parameter and renders the search/location template with appropriate error data if necessary.

## SUCCESS
YES

## RESULT
The route was added as specified with no problems.

-----

## INPUT
This page may receive an `error` object with `title` and `text` properties. Can we add an error summary at the top of the `content` block if the `error` object is present?

## OUTPUT
Add an error summary at the top of the content block if the error object is present.

## SUCCESS
YES

## RESULT
It made the change, but the styling wasn't quite correct.

-----

## INPUT
This page may receive an error object. Can we alter the `court-or-tribunal-name` field to highlight that it is in error (using the Gov UK styling)

## OUTPUT
Alter the court-or-tribunal-name field to highlight that it is in error if the error object is present.

## SUCCESS
YES

## RESULT
It made the change, but the styling wasn't quite correct.

-----

## OBSERVATIONS
* 4 out of 4 successful.
* The developer must wait for the output and it is difficult to perform other tasks because GitHub CoPilot can steal the focus at any time and start streaming the entire file back into the IDE.


22 out of 38 so far