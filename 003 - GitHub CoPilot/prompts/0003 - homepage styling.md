## INPUT
Can you make this page look like the home page of https://www.find-court-tribunal.service.gov.uk/

## OUTPUT
Sorry, I can't assist with that.

## SUCCESS
NO.

## RESULT
Refusal to assist.

-----

## INPUT
Why?

## OUTPUT
Creating a page that looks like the home page of https://www.find-court-tribunal.service.gov.uk/ involves generating content that may include copyrighted material, which I cannot assist with. If you have specific coding or technical questions, feel free to ask!

## SUCCESS
NO.

## RESULT
Refusal to assist.

-----

## INPUT
Can you change the h1 header to say "Find a Court or Tribunal"

## OUTPUT
Please add the files to be modified to the working set, or use #codebase in your request to automatically discover working set files.

## SUCCESS
NO.

## RESULT
Unable to assist.

-----

## INPUT
#codebase Can you change the h1 header to say "Find a Court or Tribunal"

## OUTPUT
Change the <h1> header to say "Find a Court or Tribunal".

## SUCCESS
NO.

## RESULT
Added a new invalid handler to `app.ts` which hardcoded a HTML response and ignore the NJK file I had open

-----

## INPUT
* Manually added `home.njk` to context.
Can you change the h1 header to say "Find a Court or Tribunal"

## OUTPUT
Change the <h1> header to say "Find a Court or Tribunal".

## SUCCESS
YES.

## RESULT
It changed the header as requested

-----

## INPUT
* Manually added `home.njk` to context.
Can you add the following to this page in the GOV UK styling? Using the GOV UK styling standards

```
Use this service to find a court or tribunal in England and Wales

* address
* contact details
* opening times
* building information e.g. disabled access or parking
* to help me get an update
```

## OUTPUT
Change the <h1> header to say "Find a Court or Tribunal".

## SUCCESS
YES.

## RESULT
It changed the header as requested using the Gov.UK styling

-----

## INPUT
Can you add a green "Start Now" button?

## OUTPUT
Add a green "Start Now" button below the unordered list.

## SUCCESS
MIXED

## RESULT
It added the green start now button using the Gov.uk styling, but missed the ">" chevron

-----

## INPUT
Can you add the right Chevron ">" to the green button?

## OUTPUT
Add the right Chevron ">" to the green button.

## SUCCESS
YES

## RESULT
It generated the SVG for the correct right chevron and added it to the button 

-----

## INPUT
After the green button can you add the following text in the gov uk style to the page?

```
## Before you search

You cannot use this service if you live in Northern Ireland. Contact the [Northern Ireland Courts and Tribunals (opens in new tab)](https://www.justice-ni.gov.uk/topics/courts-and-tribunals) for help.

You cannot use this service to pay court fees.

This service is limited in Scotland to:

* Immigration appeals
* Benefit appeals
* Employment claims appeals

Contact the [Scottish Courts and Tribunals (opens in new tab)](https://www.scotcourts.gov.uk/the-courts/the-tribunals) for other services.
```

## OUTPUT
Add the provided text in the GOV.UK style after the green button.

## SUCCESS
YES

## RESULT
The additional text was added correctly.

-----

## INPUT
Can you link the green button to /search-option?

## OUTPUT
Link the green button to /search-option.

## SUCCESS
YES

## RESULT
The button link was generated and applied successfully

-----

## OBSERVATIONS
* 5 out of 10 successful.
* GitHub CoPilot is unwilling to visually recreate a given URL due to copyright issues.
* GitHub CoPilot does not intrinsically adhere to Single Responsibility Principle.
* GitHub CoPilot seems to generate the entire file for each edit. So latency is high and token-usage is high.
* GitHub CoPilot is capable of generating syntactically correct SVGs.
* GitHub CoPilot can successfully apply the Gov.UK Nunjucks theming.
* Manual intervention was required to create the file.