## INPUT
#codebase We need two new templates `court-details/in-person-court` and `court-details/not-in-person-court`. They will both be passed view-data from the `FactAPI.getCourtBySlug` method.

* You MUST use the Gov UK styling for the templates.
* The page title to use will be available in the `title` property from the view-data.
* The heading (h1) will be available in the `name` property from the view-data.
* For the `not-in-person-court` template, the property `notInPersonP1` will need to be rendered. 
* You should then list the `addresses` available.
* If there is an `info` property, then it should be displayed under the `h3` heading of `Additional information`.

## OUTPUT
Create a new template for in-person court details using Gov UK styling.
Create a new template for not-in-person court details using Gov UK styling.

## SUCCESS
MIXED

## RESULT
It created the files, but forgot to add the title and lazily rendered the addresses without regard for the object structure - so it rendered `[object Object]`

-----

## INPUT
* The content of the page needs to be in a grid with the Gov Uk styling.
* The `h1` heading should span the full grid.
* The addresses should occupy the left two-thirds of the page.
* The right column should occupy one-third.
* In the right-column we need the image from the `image_file` property in its own row, with an alt-tag and sub-title of the `name` property.

## OUTPUT
Update the content to be in a grid with Gov UK styling, adjust the heading to span the full grid, and organize the addresses and image into left and right columns respectively.

## SUCCESS
YES

## RESULT
The styling was exactly as required using the Gov UK styles

-----

## INPUT
The addresses block needs to be altered in the following ways:
* The `h2` element should be a `h3` elememt.
* Addresses should not be wrapped in `ul` and `li` elements, wrap it with a `p` tag instead.
* The `address` item in the `addresses` array is actually an object and needs to have each line listed from `address.address_lines`, we also want the `town` and `postcode` listed too.
* All address lines can be separated using `<br />`.

## OUTPUT
Update the addresses block to use h3 instead of h2, wrap addresses in p tags, and display each line from address.address_lines along with town and postcode.

## SUCCESS
YES

## RESULT
Changes made as expected, correct styles used.

-----

## INPUT


## OUTPUT


## SUCCESS


## RESULT


-----

## OBSERVATIONS
* 2 out of 3 successful.
* GitHub CoPilot may forget instructions.


32 out of 51 so far (63%)