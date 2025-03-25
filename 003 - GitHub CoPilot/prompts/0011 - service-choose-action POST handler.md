## INPUT
Can you add a POST route handler for `/service-choose-action`, the payload is JSON with the result from a single radio-button called `action`.

* When the value of `action` is one of 'nearest', 'documents', 'update' or 'not-listed' then it should redirect to `'/services/' + action`.
* Otherwise we should redirect to `/service-choose-action`

## OUTPUT
Add a POST route handler for /service-choose-action to handle the JSON payload and redirect based on the value of action.

## SUCCESS
YES

## RESULT
The route-handler was created exactly as desired

-----

## OBSERVATIONS
* 1 out of 1 successful.


18 out of 34 so far