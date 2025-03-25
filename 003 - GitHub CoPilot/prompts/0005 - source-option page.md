## INPUT
Please create a nunjucks View in a ./src/main/views/search/option file - it should use the Gov UK styling and the page will ask the user "Do you know the name of the court or tribunal?"

## OUTPUT
Create a Nunjucks view that uses Gov UK styling and asks the user "Do you know the name of the court or tribunal?".

## SUCCESS
YES

## RESULT
It created the file in the correct location, with convincing looking content. But it used the wrong template causing the application to crash.

-----

## INPUT
Can you change the layout to use template.njk instead of layout.njk

## OUTPUT
Change the layout to use template.njk instead of layout.njk.

## SUCCESS
YES

## RESULT
It used the correct template and fixed the application.

-----

## INPUT
* Can you remove the heading `Please select an option`.
* Can you change the text `Select yes if you know the name of the court or tribunal` to `The name of the court or tribunal can be found on a letter, email or text from us.`.
* Can you change the "Yes" radio button to say `I have the name`.
* Can you change the "No" radio button to say `I do not have the name`.

## OUTPUT
Make the specified changes to the text and radio button labels.

## SUCCESS
YES

## RESULT
The changes were made as specified.

-----

## INPUT
Can you alter the `form` so that it POSTS to `/search-option`

## OUTPUT
Alter the form so that it posts to /search-option.

## SUCCESS
YES

## RESULT
The form POST location was updated successfully

-----

## OBSERVATIONS
* 4 out of 4 successful.
* Prompts need to be crafted with Markdown.


