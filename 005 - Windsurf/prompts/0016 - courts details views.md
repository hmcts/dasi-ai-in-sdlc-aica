## INPUT
Can you update the court details views to look more like this `https://www.find-court-tribunal.service.gov.uk/courts/blackpool-family-court`?

You can use the existing templates as a starting point. And the same court is rendered locally here `https://localhost:3100/courts/blackpool-family-court`

## OUTPUT
I'll update the court details templates to match the design of the official Find a Court or Tribunal service. Let me first check the reference URL to understand the design I need to implement.

Created outline

www.find-court-tribunal.service.gov.uk
View Page
Let's view the main content of the page:

Analyzed content
10 chunks
Now, let's look at our current templates to see what needs to be updated:

Analyzed

in-person-court.njk:(1-126)
Analyzed

not-in-person-court.njk:(1-93)
Now, let's update both templates to match the design of the official Find a Court or Tribunal service. I'll start with the in-person court template:

Edited
in-person-court.njk
+125
-80
 46
Open diff
Now, let's update the not-in-person court template to match the same styling:

Edited
not-in-person-court.njk
+146
-59
 34
Open diff
Let's restart the application to see our changes:

Ran terminal command
~/Downloads/AI-IN-THE-SDLC/005 - Windsurf
Go to terminal
$ lsof -i :3100 | grep LISTEN

Output
CopyInsert
node    30628 matt   22u  IPv6 0xd08dbc5634c1e51e      0t0  TCP *:opcon-xps (LISTEN)
Exit Code 0

Auto-run
Ran terminal command
~/Downloads/AI-IN-THE-SDLC/005 - Windsurf
Go to terminal
$ kill -9 30628

Exit Code 0

Auto-run
Ran background terminal command
~/Downloads/AI-IN-THE-SDLC/005 - Windsurf
Go to terminal
$ yarn start

Output
CopyInsert
Debugger listening on ws://127.0.0.1:56261/b197f32d-3a0f-44f6-bf1e-3f954c778af9
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
Debugger listening on ws://127.0.0.1:56270/41b61024-276b-450d-a99a-f911199b8522
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
2025-03-20T11:44:50+00:00 - info: [applicationRunner] Attempting to read properties from volume: '/mnt/secrets/'
2025-03-20T11:44:50+00:00 - info: [applicationRunner] Could not find properties to load, check your config, you can ignore this if you don't expect any
(node:32974) [DEP0044] DeprecationWarning: The `util.isArray` API is deprecated. Please use `Array.isArray()` instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:32974) [DEP0055] DeprecationWarning: The `util.isRegExp` API is deprecated. Please use `arg instanceof RegExp` instead.
(node:32974) [DEP0047] DeprecationWarning: The `util.isDate` API is deprecated.  Please use `arg instanceof Date` instead.
(node:32974) [DEP0060] DeprecationWarning: The `util._extend` API is deprecated. Please use Object.assign() instead.
2025-03-20T11:44:50+00:00 - info: [server] Application started: http://localhost:3100
^CWaiting for the debugger to disconnect...
Exit Code 129

Auto-run
Checked command status
BetaRunning Preview:

Find a Court or Tribunal

Open Preview
Open in External Browser

Let's create a memory to document the updates we've made to the templates:

I've updated both court details templates to match the design of the official Find a Court or Tribunal service. Here's what I've done:

Key Changes to Both Templates:
Improved Layout Structure:
Moved the main heading outside the grid layout for better alignment
Organized content into clear sections with proper heading hierarchy
Added the "Write to us:" section as a main heading, matching the official site
Enhanced Content Presentation:
Used GOV.UK Design System components like inset text for important information
Improved the formatting of contact details, addresses, and other information
Added warning text component for urgent messages
Added New Sections:
"Make a complaint" section with link to the official complaints procedure
"Professional users' court and tribunal access scheme" section
"Court codes for legal professionals" section for DX and GBS codes
Improved Contact Information Display:
Better formatting for email addresses and phone numbers
Added proper links with tel: and mailto: protocols
Improved display of descriptions and explanations
Specific Improvements for In-Person Courts:
Map Integration:
Added a static map image with a border
Improved the "Get directions" link
Added a link to "What to expect coming to a court or tribunal"
Areas of Law Display:
Changed to "This location handles" to match the official site
Added support for external links to more information
Specific Improvements for Not-In-Person Courts:
Service Center Support:
Added support for displaying service center contact information
Prioritized service center addresses when available
NotInPersonP1 Display:
Changed from a regular paragraph to an inset text component for better visibility
Both templates now closely match the design and content structure of the official Find a Court or Tribunal service while maintaining all the functionality of the original templates. The changes follow the GOV.UK Design System patterns and improve the overall user experience.

## SUCCESS
YES

## RESULT
It matched the design of the official Find a Court or Tribunal service.

-----

## OBSERVATIONS
* 1 out of 1 successful
* Windsurf looked at both pages and applied a diff for the changes.