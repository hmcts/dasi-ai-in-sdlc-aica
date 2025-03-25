## INPUT
Can you add a POST route handler for `/service-choose-action`, the payload is JSON with the result from a single radio-button called `action`.

* When the value of `action` is one of 'nearest', 'documents', 'update' or 'not-listed' then it should redirect to `'/services/' + action`.
* Otherwise we should redirect to `/service-choose-action`

## OUTPUT
I'll add a POST route handler for /service-choose-action to handle the form submission based on the specified requirements. First, I notice that there's a discrepancy between the form in the template (which uses choose-action as the field name) and your requirements (which expect an action field). I'll update both the route handler and fix the template.
Now I need to update the choose-action.njk template to use 'action' as the field name instead of 'choose-action' and ensure the form method is correctly set to POST:
Perfect! I've made the following changes:
Added a POST route handler for /service-choose-action in the homeRouter.ts file that:
Extracts the value of the 'action' radio button from the request body
Redirects to '/services/{action}' when the action is one of 'nearest', 'documents', 'update', or 'not-listed'
Otherwise redirects back to '/service-choose-action'
Updated the choose-action.njk template to:
Change the form method from GET to POST
Change the radio button field name from 'choose-action' to 'action' to match what the route handler expects
Updated the idPrefix to 'action' for consistency
Now when users select an option on the "What do you want to do?" page and click "Continue", they will be redirected to the appropriate service page based on their selection.

## SUCCESS
YES

## RESULT
The route-handler was created exactly as desired

-----

## OBSERVATIONS
* 1 out of 1 successful.


