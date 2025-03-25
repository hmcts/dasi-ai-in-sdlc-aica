## INPUT
Can you make this page look like the home page of https://www.find-court-tribunal.service.gov.uk/

## OUTPUT
I'll help you make this page look like the Find a Court or Tribunal home page. Let me first check what the target page looks like.
Let me update your home.njk file to match the Find a Court or Tribunal service home page, using the GOV.UK design system:
I've updated your home.njk template to match the layout and design of the Find a Court or Tribunal service homepage. The updated template includes:
A proper page title
A main heading "Find a court or tribunal"
An introductory paragraph explaining the service
A bulleted list of what information users can find
An inset text box clarifying what the service doesn't provide
A prominent "Start now" button using the GOV.UK design system macro
A related services sidebar with links to other relevant services
This template follows the GOV.UK Design System patterns and uses the appropriate Nunjucks macros and layout components. The "Start now" button is set up to use the GOV.UK design system's button component with the isStartButton property set to true, which will style it as a primary call-to-action button.

## SUCCESS
YES

## RESULT
It made the changes very quickly, but it forgot to import the `govukButton`

-----

## INPUT
You forgot to import `govukButton`

## OUTPUT
You're right, I need to import the govukButton component from the GOV.UK design system. Let me fix that:
Now the button component will render correctly. I've added the import statement {% from "govuk/components/button/macro.njk" import govukButton %} at the top of the file, which allows us to use the govukButton macro in the template.


## SUCCESS
YES

## RESULT
It made the correct change.

-----

## OBSERVATIONS
* 2 out of 2 successful
* Cursor with Agent mode is very conversational, easy to work with.
