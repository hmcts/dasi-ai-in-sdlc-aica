# AI in the Software Delivery Life Cycle
An exploration of AI Coding Assistants

## Results
| Tool                                                  | Time (minutes)  | Productivity Change (%) | Prompts Required | Successful Prompts (%) | Manual Interventions | Mean Response Size | Median Response Size | 
| :---------------------------------------------------- | :-------------: | :---------------------: | :--------------: | :--------------------: | :------------------: | :----------------: | :------------------: | 
| Manual                                                |       285       |            -            |        -         |            -           |          -           |        -           |         -            | 
| [GitHub CoPilot](https://github.com/features/copilot) |       360       |           -26%          |        51        |        63% (32)        |          4           |        129         |         97           | 
| [Cursor](https://www.cursor.com/)                     |       130       |           +54%          |        17        |        100% (17)       |          0           |        1338        |         1135         | 
| [Windsurf](https://codeium.com/windsurf)              |       100       |           +65%          |        12        |        92% (11)        |          1           |        3891        |         2812         | 
| [Cline](https://cline.bot/)                           |       105       |           +63%          |        17        |        94% (16)        |          0           |        5472        |         4950         | 

#### Time (minutes)
The total time taken to recreate that government service.

Smaller values are desirable, since it demonstrates shorter time to completion.

#### Productivity Change (%)
A crude percentage difference in the total time taken to achieve the same functional outcome when compared to the manual activity.

Larger (%) positive values are desirable, since it demonstrates an improvement over (human) engineer capability.

#### Prompts Required
The total number of prompts taken to achieve the same functional outcome when compared to the manual activity.

Smaller values are desirable, since it demonstrates that the AI Coding Assistant requires less direction from the (human) engineer.

#### Successful Prompts
The number of prompts that yielded the requested outcome from the (human) engineer.

Larger (%) values are desirable, since it demonstrates that the AI Coding Assistant can complete the request on the first attempt.

#### Manual Interventions
The number of times where the (human) engineer needed to intervene for the purpose of:

* The AI Coding Assistant could not complete the functional outcome of the step.
* The AI Coding Assistant made inappropriate changes, or became stuck.

Smaller values are desirable, since reduced intervention demonstrates autonomy and agent capabilities of the AI Coding Assistant.
 
#### Mean Response Size
The mean size of response/output given by the AI Coding Assistant.

Larger values are desirable, since it explains to (human) engineers what action is taken by the AI Coding Assistant.

#### Median Response Size
The median size of response/output given by the AI Coding Assistant.

Larger values are desirable, since it explains to (human) engineers what action is taken by the AI Coding Assistant.

## Method

1. Manually recreate a government service so that a baseline of productivity can be taken.
    1. [FACT-Frontend](https://github.com/hmcts/fact-frontend) was chosen.
    2. Time-box the activity to a maximum of 6 hours (including environment setup).
    3. Record time-taken in minutes (excluding environment setup).
    4. Follow the functional happy-path.
    5. Start from the [Express-Template](https://github.com/hmcts/expressjs-template).
    6. Break the activity down into functional steps.
2. Recreate the government service using AI Coding Assistant tooling.
    1. Start from the same Express-Template to recreate FACT-Frontend.
    2. Choose the best model advocated by the vendor.
    3. Time-box the activity to a maximum of 6 hours (including environment setup).
    4. Record time-taken in minutes (excluding environment setup).
    5. Follow the same functional happy-path as (1.iv).
3. Repeat (2) for each coding assistant.
 
## Working Demonstration

The results of the AI Coding Assistant evaluation is working-code within each sub-directory in this directory (for example `./004 - Cursor/`).

Each sub-directory uses the [Express-Template](https://github.com/hmcts/expressjs-template), so the setup instructions are the same for each. To recap, these are:

1. Run `yarn install`.
2. Run `yarn run start:dev`.

You will also need the [FACT-API](https://github.com/hmcts/fact-api) to run locally, to recap you can do this by running:

1. Run `docker compose up -d`.

## Prompts

Prompts are stored as markdown files within the `prompts/` sub-directory within each results directory (for example `./006 - Cline/prompts/0001 - fix boilerplate issue.md`).

Prompts are broken down into 4 sections:

1. `INPUT`
    * The raw prompt used by the (human) engineer in the user-interface for the AI Coding Assistant.
2. `OUTPUT`
    * The raw output given by the AI Coding Assistant (excluding file-changes).
3. `SUCCESS`
    * A trinary value indicating whether the prompt succeeded (`YES`), failed (`NO`) or produced mixed results (`MIXED`).
    * Only `YES` values are scored or recorded as success.
4. `RESULT`
    * A human-readable explanation of the end-result of action by the AI Coding Assistant.

## AI Coding Assistants

### [GitHub CoPilot](https://github.com/features/copilot)
* Version: 1.291.0
* Model: GPT-4o

### [Cursor](https://www.cursor.com/)
* Version: 0.47.8
* Model: Claude Sonnet 3.7 (no extended thinking)

### [Windsurf](https://codeium.com/windsurf)
* Version: 1.5.8 with Codeium v.1.40.2
* Model: Claude Sonnet 3.7 (no extended thinking)

### [Cline](https://cline.bot/)
* Version: 3.8.2
* Model: Claude Sonnet 3.7 (no extended thinking)




