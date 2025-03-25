## INPUT
#codebase can we add a new file for an Express router to handle the / route?

In the file I want a handler for the GET request of /search-option which should render the search/option nunjucks template

## OUTPUT
Searched the codebase

Create a new Express router to handle the /search-option route and render the search/option Nunjucks template.

Import and use the new router for the /search-option route.

## SUCCESS
MIXED.

## RESULT
It created the Express Router file.
It imported the Express Router file into `app.ts` but then tried to add a glob-matching pattern to import all Express routers, which failed.

-----

## INPUT
Can you remove the glob-matching pattern to import Express Routers?

## OUTPUT
Remove the glob-matching pattern to import Express Routers and manually import the necessary routers.

## SUCCESS
MIXED

## RESULT
It removed the glob-matching pattern and restored the import of the home and info routers. But it mixed Express Routers and Application handlers without consideration as to their order and paths.
Manual intervention was required to fix this.

-----

## OBSERVATIONS
* 0 out of 2 successful.
* The engineer needs to plan the target architecture ahead-of-time so that the correct questions are asked.
* Manual intervention needed.
* GitHub CoPilot can create source-code files.
* GitHub CoPilot cannot fundamentally understand routing and the implications of Express route-behaviour.