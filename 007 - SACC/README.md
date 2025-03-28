#This is the README for the SACC pilot

##This directory contains the following:

More detailed documentation around how this works, ingestion, analysis, and reporting approaches can be found
[here](https://tools.hmcts.net/confluence/pages/viewpage.action?pageId=1839014623).

Within this directory you will find the following


###Directories

- **database** - Contains the Postgres backup of the analyses carried out
- **Documents** - Contains pdfs of design documentation and original thesis
- **repos** - Contains the source code repositories for the original P&I service
- **sacclib** - Contains source code for common library routines

###Files
 
####Configuration
 
- **.env** - An environment file holding your LLM keys
- **config.yml** - Your configuration file. Use this to set your database credentials
- **createdb.sql** - SQL code to generate the requisite tables.  You could also just take the detauls from the backup contained within the **database** directory.


####Ingest

- **ingest\_functional\_attributes\_from\_source.py** - Ingest the technology stacks from the source code.
- **ingest\_interpreted\_documentation\_from\_source.py** - Generate documentation from source code. 
- **ingest\_nonfunctional\_attributes\_from\_source.py** - Ingest the non-functional attributes from the source code.
- **ingest\_various\_design_features.py** - Ingest a number of design and standard features (Technical Capabilities, Architectural Aecisions, Architecture Principles, Target Design Requirements)


####Analyse

- **analyse\_target\_designs\_versus\_documentation.py** - A program  to generate the analysis of target designs versus generated documentation. You should have generated the documentation and the target design content first.
- **analyse\_target\_designs\_versus\_sourcecode.py** - A program to generate the analysis of target designs versus sourcecode.  You should have generated the target design content first

####Tools

- ***dbquery.py*** - The Natural Language Query tool
- **identify\_files\_to\_reanalyse.py** - A program to identify files in the repository that need to be reanalysed as they may have changed since they were originally analysed.

####Reports

- ***report\_general.py*** - Show the general dashboard and LLM statistics
- ***report\_random\_file\_documentation.py*** - Show a random file's source code and documentation
- ***report\_random\_file\_nfrs.py*** - Show a random file's source code and nonfunctional requirements
- ***report\_random\_file\_techstack.py*** Show a random file's source code and technology stack
- ***report\_source\_files\_of\_interest.py*** - Search for source files that have specific criteria related to mandatory, prohibited, and proof values. Optionally, show their details and source code.  


# Order of ingestion

1. ingest\_interpreted\_documentation\_from\_source.py: Generating documentation for the source code as this feeds in to other ingestions.
2. ingest\_functional\_attributes\_from\_source.py: Extract the technology stack from source code.
3. ingest\_various\_design\_features.py: Extract content from design documents
4. ingest\_nonfunctional\_attributes\_from\_source.py: Ingest NFRs from source code
5. analyse\_target\_designs\_versus\_documentation.py: Generate analyses of target designs against the documentation
6. analyse_target_designs_versus_sourcecode.py: Generate the analyses of target designs against source code.

  
 






 


