## INPUT
Please create a nunjucks View in a `./src/main/views/search/location` file - it should use the Gov UK styling and the page will ask the user "What is the name or address of the court or tribunal?"

* The title should be `What is the name or address of the court or tribunal?`
* The text underneath the title should be `The name of the court or tribunal can be found on a letter, email or text from us.`
* The text for the input should be `Enter a court name, address, town or city`
* The hint-text for the input should be `For example, Blackburn Family Court.`
* The form should perform a `GET` to `/courts`

## OUTPUT
I need to create a Nunjucks view file for a search location page. Let's analyze what I need to do:

Create a file at ./src/main/views/search/location - I notice there's no file extension specified, but since we're creating a Nunjucks view, it should have a .njk extension.
The view should use Gov UK styling.
The page will ask the user "What is the name or address of the court or tribunal?"
It needs specific content elements:
Title: "What is the name or address of the court or tribunal?"
Text under title: "The name of the court or tribunal can be found on a letter, email or text from us."
Input label: "Enter a court name, address, town or city"
Input hint text: "For example, Blackburn Family Court."
Form should perform a GET request to "/courts"
Let me first check if the directory ./src/main/views/search/location exists. I can see from the file structure that src/main/views/search/ exists, but I don't see a location directory. I'll need to create the file and ensure the directory structure exists.

I should also look at existing Nunjucks templates to understand the structure and styling used in this project. I can see there's already a template at src/main/views/search/option.njk which might be helpful to reference.

Let me first read the existing template to understand the structure:


Cline wants to read this file:


Now I'll also check the template.njk file to understand the base template structure:


Cline wants to read this file:


Now I have a better understanding of the template structure. The template.njk extends the govuk/template.njk, which is likely part of the Gov UK design system.

Let me also check the search.ts route file to understand how the routes are set up:


Cline wants to read this file:


Perfect! I can see that the route /search-by-name is already set up to render the 'search/location' view, which is the file I need to create.

Now I have all the information I need to create the Nunjucks view. I'll create a file at src/main/views/search/location.njk with the following content:

It should extend the template.njk
It should have a form that performs a GET request to "/courts"
It should include the specified title, text, input field with label and hint text
It should follow the Gov UK design system patterns
Let me create the file:


Cline wants to create a new file:

Checkpoint
Compare
Restore


I've successfully created the Nunjucks view file at src/main/views/search/location.njk with all the required elements:

The title is set to "What is the name or address of the court or tribunal?"
The text underneath the title is "The name of the court or tribunal can be found on a letter, email or text from us."
The input label is "Enter a court name, address, town or city"
The hint text for the input is "For example, Blackburn Family Court."
The form is set to perform a GET request to "/courts"
The file follows the Gov UK design system patterns and matches the structure of the existing templates in the project. Now I can use the attempt_completion tool to inform the user that the task has been completed.


Task Completed
I've created the Nunjucks view file at src/main/views/search/location.njk with the following features:

Title: "What is the name or address of the court or tribunal?"
Descriptive text: "The name of the court or tribunal can be found on a letter, email or text from us."
Input field with label: "Enter a court name, address, town or city"
Hint text: "For example, Blackburn Family Court."
Form configured to perform a GET request to "/courts"
The view follows the Gov UK design system patterns and integrates with the existing application structure. The route handler for /search-by-name is already set up to render this 

## SUCCESS
YES

## RESULT
Cline made the change exactly as requested

-----

## OBSERVATIONS
* 1 out of 1 successful
* 