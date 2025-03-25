## INPUT
#codebase you need to create an API interaction service at `./src/main/factAPI.ts`. This service will call the "fact-api" service which is available at `http://localhost:8081`. The "fact-api" service has an OpenAPI/Swagger document described as JSON at `http://localhost:8081/v3/api-docs` we need to provide functions to call the following three APIs:
* GET `/courts`
* GET `/courts/court-history/search`
* GET `/courts/{slug}`

## OUTPUT
Create a new API interaction service to call the "fact-api" service.

Update the /courts route to use the new FactAPI service.

## SUCCESS
YES

## RESULT
It created the `factAPI` service as intended, and updated the `POST` handler to use the new FactAPI service. It made some incorrect assumptions about parameter names.

-----

## INPUT
The `getCourts` function needs to accept a parameter which represents the court or tribunal name, this parameter should be passed to the `/courts` URL as the querystring parameter named `q`

## OUTPUT
Update the /courts route to pass the court or tribunal name to the getCourts function
Update the getCourts function to accept a parameter for the court or tribunal name and pass it as a query string parameter.

## SUCCESS
YES

## RESULT
It made the correct change to the `factAPI` service and also altered its usage in `home.ts` correctly.

-----

## INPUT
The `searchCourtHistory` function parameter named `query` needs tp be passed to the `/courts/court-history/search` URL as the querystring parameter named `q`

## OUTPUT
Update the searchCourtHistory function to pass the query parameter as a query string parameter named q.

## SUCCESS
YES

## RESULT
The method was updated successfully

-----

## INPUT
#codebase can you analyze the Swagger document at `http://localhost:8081/v3/api-docs` and generate corresponding types for it?

## OUTPUT
Sorry, I can't assist with that.

## SUCCESS
NO

## RESULT
No help.

-----

## INPUT
Can you recommend how I might create strong types from a JSON swagger document?

## OUTPUT
You can use a tool like swagger-typescript-api to generate TypeScript types from a Swagger JSON document. Here are the steps to do this:

Install swagger-typescript-api:

Generate TypeScript types: Run the following command to generate TypeScript types from your Swagger JSON document:

This will create TypeScript types in the ./src/types directory based on the Swagger document.

Use the generated types: You can now import and use the generated types in your TypeScript code. For example:

This approach ensures that your TypeScript code is strongly typed and consistent with the API definitions in the Swagger document.

## SUCCESS
YES

## RESULT
Good guidance on creating strong types.

-----

## INPUT
Can you run these commands and create the recommended files?

## OUTPUT
Sorry, I can't assist with that.

## SUCCESS
NO

## RESULT
No help.

-----

## INPUT
#codebase I have ran the commands and generated the types at `./src/types/Api.ts` can you import them and apply them to the FactAPI so that the methods are strongly typed?

## OUTPUT
Import the generated types and apply them to the FactAPI methods for strong typing

## SUCCESS
YES

## RESULT
The FactAPI was updated successfully

-----

## OBSERVATIONS
* 5 out of 7 successful.
* GitHub CoPilot did not call any extra tools (e.g. MCP) to gather information about the given OpenAPI/Swagger document.
* GitHub CoPilot makes incorrect assumptions without validation, particularly in reference to API design.
* GitHub CoPilot prefers implicit-typing and will not create types unless explicitly instructed.
* GitHub CoPilot cannot execute terminal commands.
* Manual intervention


27 out of 45 so far