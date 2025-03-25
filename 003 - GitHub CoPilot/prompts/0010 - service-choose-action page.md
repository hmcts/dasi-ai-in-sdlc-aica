## INPUT
#codebase Please create a nunjucks View in a `./src/main/views/choose-action` file - it should use the Gov UK styling and the page will ask the user "What do you want to do?"

## OUTPUT
Create a new Nunjucks view that uses Gov UK styling and asks the user "What do you want to do?".

## SUCCESS
YES

## RESULT
A page was created with good defaults using the GovUk styling.

-----

## INPUT
Please can we alter the page so that:
* The first radio-button says `Find the nearest court or tribunal`
* The second radio-button says `Find a court or tribunal to send documents to`
* The third radio-button says `Contact a court or tribunal to get an update on your application`
* There is then a divider that says `or`
* The final radio-button says `It is not listed here`
* The enclosing `form` should POST to `/service-choose-action`

## OUTPUT
Update the radio buttons and form action as specified.

## SUCCESS
YES

## RESULT
The page was updated as requested.

-----

## OBSERVATIONS
* 2 out of 2 successful.
* It is interesting that GitHub CoPilot responds with HTML instead of the JavaScript helpers to create radio-buttons. It implies that that the LLM has been trained on the rendered HTML output. Not the open-source repositories.

17 out of 33 so far