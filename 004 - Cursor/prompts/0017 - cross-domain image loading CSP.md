## INPUT
Images loaded from `https://factaat.blob.core.windows.net` are failing to load because of Content-Security-Policies. CAn you fix this?

## OUTPUT
I'll update the Content Security Policy to allow loading images from the Azure Blob Storage domain.
Let's look for helmet configuration since it's likely handling the CSP:
Let's check the Helmet configuration:
Now I'll update the Helmet configuration to allow images from the Azure Blob Storage:
I've updated the Content Security Policy to allow images to be loaded from Azure Blob Storage. Here's what I changed:
Added a new constant for the Azure Blob Storage domain:
Apply to 0017 - cross...
;
Added the Azure Blob Storage domain to the imgSrc directive in the Content Security Policy:
Apply to 0017 - cross...
,
These changes will allow the browser to load images from the Azure Blob Storage without being blocked by the Content Security Policy. The court images should now display properly on the court details page.

## SUCCESS
YES

## RESULT
It worked exactly as expected

-----

## OBSERVATIONS
* 1 out of 1 successful.

17 out of 17 total