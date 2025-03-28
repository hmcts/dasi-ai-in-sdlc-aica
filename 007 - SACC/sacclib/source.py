#
#   Functionality associated with analysing and extracting content from source code
#

from sacclib.load import loadDocument, loadText, loadFile
from sacclib.utils import printJSON, escapeCurlies, escapeTripleQuotes, getResponseDictionary
from sacclib.llm import estimatedTokensFromString, getLLMMetrics, estimatedTokensRequired, getLLMServer
from pydantic import BaseModel, Field
from typing import Optional
import json

from sacclib.database import ( 
    insertFunctionalAttributeFromSource,
    insertNFRFromSource,
    parseAndSaveLLMMetrics,
    insertDocumentationFromSource,
    getSourceDocumentation,
    getTDSections,
    insertDocumentationVersusTargetDesignAnalysis,
    getTDRequirements,
    insertSourceCodeVersusTargetDesignAnalysis
)

from sacclib.utils import printJSON
from sacclib.files import linesInFile
from dotenv import load_dotenv
import os

load_dotenv()   # Load .env values

#
#   Interpreting what the source file does and generating some documentation
#
def extractSourceDocumentation(llmserver="ollama", fname=None, verbose=False):

    fileContent = loadFile(fname=fname, includeFNAME=True, includeLineNumbers=True)
    fileContent = escapeTripleQuotes(fileContent)

    # NOTE: We hardcode the target design objectives in here, but it could also easily be 
    #       generated dynamically from the database after the target designs have been ingested

    prompt = f"""You are an expert Software Architect and programmer with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse some source code to provide evidence for testimony in a multi-million dollar lawsuit.

        Between the triple backticks, You will find some code to analyse. Each line starts with a line number. 
       
        ```
        {fileContent}
        ```

        Provide some functional documentation of what this source code does. Describe this in as many words as you would need so that someone who was unfamiliar with the code could then look at the code and understand it easily. If there is any documentation included in the code, then use this to support your analysis.

        The documentation you create will be composed of the following:
            1) Overall aim:
                - Describe in no more than 400 words, What the source code is trying to accomplish?
            2) Successful Outcome:
                - What does a successful run of this code look like?
            3) Failed Outcome:
                - What does a failed attempt at running this code look like?
            4) Functionality: What is the code doing? The following points may help clarify your thinking:
                - What tests are being run?
                - What libraries are being called?
                - What coding styles are being used?
                - What standards are being used?
                - Are there other files or encapsulated functionality that it relies on?
            5) Evidence: What evidence is there of the following target design areas being used or referenced: 
                - Use of APIs
                - Working with Consumers and Connectivity
                - User Authentication and Verification with IDAMs
                - Data Storage
                - Reference Data
                - Network

        You must provide your answer as JSON in the following format:

        {{
            "documentation": {{
                "overallaim" : <Overall Aim>",
                "successfuloutcome" : <Successful Outcome>
                "failedoutcome" : <Failed Outcome>
                "functionality": "<Functionality>",
                "evidence": "<Evidence of specific capabilities>",
                }}
        }}

        Check your work.
            
        """

    errors=[]       # Errors, can be  added to this
    warnings=[]     # Warnings etc can be  added to this

    tokens = estimatedTokensFromString(prompt)
    num_ctx = estimatedTokensRequired(tokenEstimate=tokens)

    class Documentation(BaseModel):
        overallaim: str = Field(..., description="What is the overall aim or objective that this source code is trying to achieve?")
        successfuloutcome: str = Field(..., description="What does a successful run of this code look like?")
        failedoutcome: str = Field(..., description="What does a failed attempt at running this code look like?")
        functionality: str = Field(..., description="Functionality found in the source code.")
        evidence: str = Field(..., description="Evidence of specific target design capabilities being referenced.")

    # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5-coder:14b"
            model = "gemma3:12b"
            model = "qwen2.5-coder:7b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)

            structured_llm = llm.with_structured_output(Documentation, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "qwen-2.5-32b"
            model = "qwen-2.5-coder-32b"
            model = "llama-3.3-70b-versatile"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Documentation, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
            model = "GPT-4o"
            model = "o3-mini"
            model = "gpt-4o-mini"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Documentation, 
                            method='json_mode',
                            include_raw = True)
        case 'azureopenai':
            azure_deployment="gpt-4o-mini"
            api_version="2024-10-21" 

            llm = getLLMServer(llmserver=llmserver, azure_deployment=azure_deployment, api_version=api_version)

            structured_llm = llm.with_structured_output(Documentation, 
                            method='json_mode',
                            include_raw = True)
        case _:
            print(f"Error: Unknown llmserver {llmserver}")
            return None

    if (verbose):
        print(f"Lines in input file = {linesInFile(fname)}")
        print(f"Size of input text = {len(prompt)}")
        print(f"Estimated number of tokens = {tokens}")
        print(f"Estimating context (with headroom) is around {num_ctx}")
        print(f"LLM Data:{llm}")

    response = structured_llm.invoke(prompt)

    return {
         'prompt': prompt,
         'response': response,
         'sourcedoc': fname,
         'errors' : errors,             # Not used yet
         'warnings' : warnings          # Not used yet
    }

#
#   Parse the extracted documentation and save them to the database
#
def parseAndSaveExtractedDocumentation(documentation, sourcedoc, doctype, verbose=False):
    if (documentation):
        overallaim = documentation.get('overallaim', None)
        successfuloutcome = documentation.get('successfuloutcome', None)
        failedoutcome = documentation.get('failedoutcome', None)
        functionality = documentation.get('functionality', None)
        evidence = documentation.get('evidence', None)

        id = insertDocumentationFromSource(overallaim=overallaim, successfuloutcome=successfuloutcome, failedoutcome=failedoutcome, functionality=functionality, evidence=evidence, sourcedoc=sourcedoc, doctype=doctype, verbose=False)

        if (verbose):
            print(f"Inserted a row with ID={id}")

        if (not id):
            print(f"Error adding Source Documentation Requirement (from source)... {sourcedoc}")

# Take the extracted documentation analysis and save it to the database
def parseAndSaveSourceDocumentation(technologiesDict, sourcedoc, doctype, verbose=False):
    technologies=technologiesDict.get('technologies', None)
    if (technologies):
        for t in technologies:
            name = t.get('name', None)
            techtype = t.get('techtype', None)
            functionality = t.get('functionality', None)
            evidence = t.get('evidence', None)
            outcome = t.get('outcome', None)
            excerpt = t.get('excerpt', None)
            linenumber = t.get('linenumber', None)

            id = insertFunctionalAttributeFromSource(technologyName=name, technologyType=techtype, functionality=functionality, evidence=evidence, outcome=outcome, excerpt=excerpt, sourcedoc=sourcedoc, lineNum=linenumber, doctype=doctype)
            if (verbose):
                print(f"Status from insert = {id}")
            if (not id):
                print(f"Error adding Functional Requirement (from source)... {name}")

#
#   Extracting and saving functional Attributes from Source Files
#
def extractFunctionalAttributesFromSource(llmserver="ollama", fname=None, verbose=False):

    fileContent = loadFile(fname=fname, includeFNAME=True, includeLineNumbers=True)
    fileContent = escapeTripleQuotes(fileContent)

    # Extract some of the automatically generated documentation of the file if it exists to provide a more informed analysis 
    documentation=getSourceDocumentation(sourceFile=fname, scope=['aim', 'success', 'failure'])
  
    prompt = f"""You are an expert Software Architect and programmer with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse some source code to provide evidence for testimony in a multi-million dollar lawsuit.

    You will be provided a source code file labelled 'Source code' and some basic documentation labelled 'documentation'.

    Use the documentation as a guide extract the overall aim of the source code, what success looks like, and what failure looks like.
        
    Now use this information when analysing the source code to identify all technology used in the source code. This technology could be:
        - the name of a programming language 
        - a framework
        - a capability
        - a library
        - a common technology standard (e.g. network, file format, database access etc.) 
        - anything else you think might be relevant

        Here is the documentation:

        {documentation}
       
        Here is the source code: Each line starts with a line number:
       
        ```
        {fileContent}
        ```        

        Find as many technologies as possible in the code to analyse.

        For each technology stack found, provide a name for the technology, the type of technology, its functionality (i.e. what it does), and any evidence to support why it is being included.  What outcome or benefit is expected as a result of this technology being used? Provide the line number where this was found and an excerpt of the code where you found it. 

        When writing the outcome, use information from the overall aim of the source code, what success looks like and what failure looks like to provide more context to your interpretation.
        
        Check your work.

        You must provide your answer as a JSON dictionary in the following format:

        {{
        
            "technologies": [
                {{
                    "name": "<Technology Name>",
                    "techtype": "<Technology Type>",
                    "functionality": "<Functionality>",
                    "evidence": "<Evidence>",
                    "outcome": "<Outcome>",
                    "excerpt": "<Excerpt of the code>",
                    "linenumber": "<Line Number>"
                }}
            ]
        }}             
        """

    errors=[]       # Errors, can be  added to this
    warnings=[]     # Warnings etc can be  added to this

    tokens = estimatedTokensFromString(prompt)
    num_ctx = estimatedTokensRequired(tokenEstimate=tokens)

    class Technology(BaseModel):
            name: str = Field(..., description="The name of the technology, library, capability, framework. standard, or function.")
            techtype: str = Field(..., description="The type or category of technology.")
            functionality: Optional[str] = Field(..., description="A brief description of what this technology does. If you don't know, say 'Unknown'")
            evidence: Optional[str] = Field(..., description="What evidence is there to support this technology being included.")
            outcome: Optional[str] = Field(..., description="What is the technology trying to achieve in this code? If you don't know, say 'Unknown'")
            excerpt: str = Field(..., description="An excerpt of the code where this technlogy was found.")
            linenumber: Optional[str] = Field(..., description="the line number of the file where this functionality was found.")

    class TechStacks(BaseModel):
        technologies: list[Technology] = Field([], description="List of technologies being used.")

    # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5-coder:14b"
            model = "qwen2.5-coder:7b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)

            structured_llm = llm.with_structured_output(TechStacks, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "qwen-2.5-32b"
            model = "qwen-2.5-coder-32b"
            model = "llama-3.3-70b-versatile"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(TechStacks, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
            model = "GPT-4o"
            model = "o3-mini"
            model = "gpt-4o-mini"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(TechStacks, 
                            method='json_mode',
                            include_raw = True)
        case 'azureopenai':
            azure_deployment="gpt-4o-mini"
            api_version="2024-10-21" 

            llm = getLLMServer(llmserver=llmserver, azure_deployment=azure_deployment, api_version=api_version)

            structured_llm = llm.with_structured_output(TechStacks, 
                            method='json_mode',
                            include_raw = True)
        case _:
            print(f"Error: Unknown llmserver {llmserver}")
            return None

    if (verbose):
        print(f"Lines in input file = {linesInFile(fname)}")
        print(f"Size of input text = {len(prompt)}")
        print(f"Estimated number of tokens = {tokens}")
        print(f"Estimating context (with headroom) is around {num_ctx}")
        print(f"LLM Data:{llm}")

    response = structured_llm.invoke(prompt)

    return {
         'prompt': prompt,
         'response': response,
         'sourcedoc': fname,
         'errors' : errors,             # Not used yet
         'warnings' : warnings          # Not used yet
    }

#
#   Parse the functional attributes and save them to the database
#

def parseAndSaveFunctionalRequirementsFromSource(technologiesDict, sourcedoc, doctype, verbose=False):
    technologies=technologiesDict.get('technologies', None)
    if (technologies):
        for t in technologies:
            name = t.get('name', None)
            techtype = t.get('techtype', None)
            functionality = t.get('functionality', None)
            evidence = t.get('evidence', None)
            outcome = t.get('outcome', None)
            excerpt = t.get('excerpt', None)
            linenumber = t.get('linenumber', None)

            id = insertFunctionalAttributeFromSource(technologyName=name, technologyType=techtype, functionality=functionality, evidence=evidence, outcome=outcome, excerpt=excerpt, sourcedoc=sourcedoc, lineNum=linenumber, doctype=doctype)
            if (verbose):
                print(f"Status from insert = {id}")
            if (not id):
                print(f"Error adding Functional Requirement (from source)... {name}")

#
#   Extracting and saving non-functional Attributes from Source Files
#
def extractNFRsFromSource(llmserver="ollama", fname=None, verbose=False):
      
    fileContent = loadFile(fname=fname, includeFNAME=True, includeLineNumbers=True)
    fileContent = escapeTripleQuotes(fileContent)

  # Extract some of the automatically generated documentation of the file if it exists to provide a more informed analysis 
    documentation=getSourceDocumentation(sourceFile=fname, scope=['aim', 'success', 'failure'])
    
    prompt = f"""You are an expert Software Architect and programmer with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse some source code to provide evidence for testimony in a multi-million dollar lawsuit.
    
    You will be provided a source code file labelled 'Source code' and some basic documentation labelled 'documentation'.

    Use the documentation as a guide extract the overall aim of the source code, what success looks like, and what failure looks like.

    You are asked to identify as many non-functional capabilities in the source code as you can find. 
    
    A non-functional capability is something that describes an additional or implicit need provided by technology. This might include the following:
        - Access Control
        - Accessibility
        - Audit
        - Audit Logs
        - Audit Trail
        - Availability
        - Bandwidth
        - Capacity
        - Consistency
        - Continuity
        - Control
        - Costs
        - Data
        - Data management
        - High Availability
        - Infrastructure
        - Integration
        - Integrity
        - Internationalisation
        - Interoperability
        - Location
        - Maintainability
        - Monitoring
        - Operability
        - Operational
        - Performance
        - Reliability
        - Resilience
        - Response time
        - Scalability
        - Security
        - Service
        - Supportability
        - Traceability
        - Useability
        - Volume
        - Volumetrics
        - anything else you think might be relevant

       
        Here is the documentation:

        {documentation}
       
        Here is the source code: Each line starts with a line number:
       
        ```
        {fileContent}
        ```        

        Find as many non-functional requirements as possible being supported by the source code.

        For each non-functional requirement found, provide a name for the non-functional requirement, the type of non-functionality it supports, and any evidence to support why it is being included.  What outcome or benefit is expected as a result of this non-functional requirement being supported? Provide the line number and an excerpt of the code where you found it. 

        When writing the nonfunctional requirement, consider whether information in the documentation relating to the overall aim of the source, and success and failure support that nonfunctional requirement.

        When writing the outcome, add where possible information from the documentation that relates to the overall aim of the source, and success and failure implications.  Is there anything in the code that contradicts the documentation?

        Check your work.

        You must provide your answer as a JSON dictionary in the following format:
        
        {{
            "technologies" : [
                {{
                
                    "name": "<NFR Name>",
                    "techtype": "<Technology Type>",
                    "nonfunctionalrequirement": <Non Functional Requirement>",
                    "evidence": "<NFR Evidence>",
                    "outcome": "<NFR Outcome>",
                    "excerpt": "<File Excerpt>",
                    "linenumber": "<Line Number>"
                }}
            ]        
        }}

        """

    errors=[]       # Errors, can be  added to this
    warnings=[]     # Warnings etc can be  added to this

    tokens = estimatedTokensFromString(prompt)
    num_ctx = estimatedTokensRequired(tokenEstimate=tokens)

    class NFR(BaseModel):
            name: str = Field(..., description="The name of the non-functional requirement.")
            techtype: str = Field(..., description="The technology used to support this non-functional requirement.")
            nonfunctionalrequirement: str = Field(..., description="What does this non-functional requirement do?")
            evidence: Optional[str] = Field(..., description="What evidence is there that the code supports this non-functional requirement.")
            outcome: Optional[str] = Field(..., description="What is this non-functional requirement trying to achieve in this code? If you don't know, say 'Unknown'")
            excerpt: str = Field(..., description="An excerpt of the code where this non-functional requirement was found.")
            linenumber: Optional[str] = Field(..., description="the line number of the file where this non-functional requirement was found.")

    class NFRs(BaseModel):
        technologies: list[NFR] = Field([], description="List of non-functional requirements found in the source code.")

    # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5-coder:14b"
            model = "qwen2.5-coder:7b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)

            structured_llm = llm.with_structured_output(NFRs, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "qwen-2.5-32b"
            model = "qwen-2.5-coder-32b"
            model = "llama-3.3-70b-versatile"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(NFRs, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
            model = "GPT-4o"
            model = "o3-mini"
            model = "gpt-4o-mini"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(NFRs, 
                            method='json_mode',
                            include_raw = True)
        case 'azureopenai':
            azure_deployment="gpt-4o-mini"
            api_version="2024-10-21" 

            llm = getLLMServer(llmserver=llmserver, azure_deployment=azure_deployment, api_version=api_version)

            structured_llm = llm.with_structured_output(NFRs, 
                            method='json_mode',
                            include_raw = True)
        case _:
            print(f"Error: Unknown llmserver {llmserver}")
            return None


    if (verbose):
        print(f"Lines in input file = {linesInFile(fname)}")
        print(f"Size of input text = {len(prompt)}")
        print(f"Estimated number of tokens = {tokens}")
        print(f"Estimating context (with headroom) is around {num_ctx}")
        print(f"LLM Data:{llm}")

    response = structured_llm.invoke(prompt)

    return {
         'prompt': prompt,
         'response': response,
         'sourcedoc': fname,
         'errors' : errors,             # Not used yet
         'warnings' : warnings          # Not used yet
    }

#
#   Parse the non-functional attributes and save them to the database
#
def parseAndSaveNonFunctionalRequirementsFromSource(technologiesDict, sourcedoc, doctype, verbose=False):
    technologies=technologiesDict.get('technologies', None)
    if (technologies):
        for t in technologies:
            name = t.get('name', None)
            techtype = t.get('techtype', None)
            nfr = t.get('nonfunctionalrequirement', None)
            evidence = t.get('evidence', None)
            outcome = t.get('outcome', None)
            # filename = t.get('filename', None)
            excerpt = t.get('excerpt', None)
            linenumber = t.get('linenumber', None)

            id = insertNFRFromSource(technologyName=name, technologyType=techtype, nfr=nfr, evidence=evidence, outcome=outcome, excerpt=excerpt, sourcedoc=sourcedoc, lineNum=linenumber, doctype=doctype)

            if (verbose):
                print(f"Inserted a row with ID={id}")

            if (not id):
                print(f"Error adding Functional Requirement (from source)... {name}")

# Analyse the Documentation against the Target Designs from the LLD
def validateTargetDesignAgainstDocumentation(llmserver="ollama", targetDesign=None, documentation=None, verbose=False):
  
    prompt = f"""You are an expert Software Architect with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse a document to provide evidence for testimony in a multi-million dollar lawsuit.

    You will see two documents below labelled 'Target Design Requirements'. and 'Source Documentation'.

    The Target Design Requirements describes technical and architectural pattern requirements that are expected to be delivered in source code.  It has some mandatory and prohibited requirements as well as areas of proof where a requirement must be met.
    
    The Source Documentation includes observations about the source code and described using the following:    
        - The overall aim of the source code.
        - What defines a successful outcome when using the code.
        - What a failed outcome would be like when using the source code .
        - What its core functionality is.
        - A brief description of how the code may align to target design areas.
         
    Your job is to compare the Target Design Requirements with the Source Documentation to determine how well they match.

    Compare the two documents, and provide an evaluation against the following five criteria:
        - Alignment: How well does the source code align with the target design requirements? 
        - Success: Does the success scenario from the source code documenation match with the target design requirements? 
        - Failure: Does the approach to dealing with failure within the source code documentation match with the targe design requirements?
        - Technology: Does the technology, and functionality contained within the source code documentation match with the target design requirements?
        - Target Design match: Do the target design descriptions within the source code documentation align to the more detailed target design descriptions within the target design documentation?

        Finally, provide a rating for each of Alignment, Success, Failure, Technology, and Target Design match. The rating should be a number between 1 and 5, with a value of 1 being the lowest or poorest match, and 5 being the highest or best match.

    Source Documentation:
    {documentation}

    Target Design Requirements:
    {targetDesign}

    Check your work.
       
    You must provide your answer as a JSON dictionary in the following format:
 
        {{
            "alignment": "<Alignment to target Design Requirements>",
            "alignment_rating": "<Alignment Rating>",
            "success": "<Sucess Match>",
            "success_rating": "<Sucess  Rating>",
            "failure" : <Failure Match>,
            "failure_rating" : <Failure  Rating>,
            "technology": "<Technology Match>",
            "technology_rating": "<Technology  Rating>",
            "target_design_match" : <Target Design Match>,
            "target_design_match_rating" : <Target Design  Rating>,
        }}
    """   

    errors=[]       # Errors, can be  added to this
    warnings=[]     # Warnings etc can be  added to this

    tokens = estimatedTokensFromString(prompt)
    num_ctx = estimatedTokensRequired(tokenEstimate=tokens)

    class Analysis(BaseModel):
            alignment: str = Field(..., description="How well does the documentation align with the target design requirements?")
            alignment_rating: str = Field(..., description="A rating between 1 and 5 for how good the alignment match is.")
            success: str = Field(..., description="How well Does the success scenario from the documentation match with the target design requirements?")
            success_rating: str = Field(..., description="A rating between 1 and 5 for how good the alignment match is.")
            failure: str = Field(..., description="How well does the approach to dealing with failure within the documentation match with the target design requirements?")
            failure_rating: str = Field(..., description="A rating between 1 and 5 for how good the failure match is.")
            technology: str = Field(..., description="How well does any technology, and functionality mentioned within the documentation match the target design requirements?")
            technology_rating: str = Field(..., description="A rating between 1 and 5 for how good the technology match is.")
            target_design_match: str = Field(..., description="How well does the documentation align to the target design description?")
            target_design_match_rating: str = Field(..., description="A rating between 1 and 5 for how good the target design match is.")

    # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5-coder:7b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)

            structured_llm = llm.with_structured_output(Analysis, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "llama-3.3-70b-versatile"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Analysis, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
            model = "gpt-4o-mini"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Analysis, 
                            method='json_mode',
                            include_raw = True)
        case 'azureopenai':
            azure_deployment="gpt-4o-mini"
            api_version="2024-10-21" 

            llm = getLLMServer(llmserver=llmserver, azure_deployment=azure_deployment, api_version=api_version)

            structured_llm = llm.with_structured_output(Analysis, 
                            method='json_mode',
                            include_raw = True)
        case _:
            print(f"Error: Unknown llmserver {llmserver}")
            return None
        
    if (verbose):
        print(f"Size of input text = {len(prompt)}")
        print(f"Estimated number of input tokens = {tokens}")
        print(f"LLM Data:{llm}")

    response = structured_llm.invoke(prompt)

    return {
         'prompt': prompt,
         'response': response,
         'errors' : errors,             # Not used yet
         'warnings' : warnings          # Not used yet
    }

# Analyse the Documentation against the Target Designs from the LLD
def validateTargetDesignAgainstSource(llmserver="ollama", targetDesign=None, sourcedoc=None, verbose=False):
  

    fileContent = loadFile(fname=sourcedoc, includeFNAME=False, includeLineNumbers=False)
    fileContent = escapeTripleQuotes(fileContent)
    
    TDRequirements = getTDRequirements(TDName=targetDesign)
    TDDescription  = f"Target Design Description: {TDRequirements['description']}\n"
    TDDescription += f"Mandatory Requirements: {TDRequirements['mandatory']}\n"
    TDDescription += f"Prohibited items: {TDRequirements['prohibitions']}\n"
    TDDescription += f"Proof: {TDRequirements['proof']}\n"
    
    prompt = f"""You are an expert Software Architect with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse a document to provide evidence for testimony in a multi-million dollar lawsuit.

    You will see two documents below labelled 'Target Design Requirements' and the other 'Source Code'.

    The Target Design Requirements include the following:
        - A description of what the Target Design is responsible for and trying to achieve.
        - A list of mandatory requirements for this target design. In other words, what needs to happen to conform to this target design.
        - A list of prohibited items. In other words, what must not happen to conform to this section?
        - A list of proof points, that would help substantiate that this target requirement is being conformed to.       
    
    Your job is to compare the Target Design Requirements with the Source Code to determine how well they match.

    Compare the two documents, and provide an evaluation against the following five criteria:
        - alignment: How well does the source code align with the target design description?
        - mandatory_match: What in the source code matches with the target design mandatory requirements? What other information would help provide evidence of a mandatory match? Provide as much detail as you can to support your conclusion.
        - prohibited_match: What evidence and examples can you find in the source code of prohibited or disallowed items listed in  target design prohibited list? If something is absent, then include it in your feedback for the mandatory_match comparison. Provide as much detail as you can to support your conclusion.
        - proof_match: What in the source code matches proof points within the target design proof list? What other information would help support proof? Provide as much detail as you can to support your conclusion.

        Finally, provide a rating for each of alignment, mandatory_match, prohibited_match, and proof_match. The rating should be a number between 1 and 5, with a value of 1 being the lowest or poorest match, and 5 being the highest or best match.

        For a high rating of mandatory_match, you must have substantial evidence that mandatory items are included.  Otherwise, you cannot return a high value. 

        For a high rating of prohibited_match, you must have substantial evidence that prohibited items are included.  Otherwise, you cannot return a high value. 

        For a high rating of proof_match, you must have substantial evidence that proof points within the source are described by the target design. Otherwise, you cannot return a high value. 

    Target Design Requirements:
    {TDDescription}

    Source Code:
    {fileContent}

    Check your work.
       
    You must provide your answer as a JSON dictionary in the following format:
 
        {{
            "alignment": "<Alignment to target Design Requirements>",
            "alignment_rating": "<Alignment Rating>",
            "mandatory_match": "<Mandatory Match>",
            "mandatory_rating": "<Mandatory Rating>",
            "prohibited_match" : <Prohibited Match>,
            "prohibited_rating" : <Prohibited  Rating>,
            "proof_match": "<Proof Match>",
            "proof_rating": "<Proof  Rating>",
        }}
    """   

    errors=[]       # Errors, can be  added to this
    warnings=[]     # Warnings etc can be  added to this

    tokens = estimatedTokensFromString(prompt)
    num_ctx = estimatedTokensRequired(tokenEstimate=tokens)

    class Analysis(BaseModel):
            alignment: str = Field(..., description="How well does the source code align with the target design requirements?")
            alignment_rating: str = Field(..., description="A rating between 1 and 5 for how good the alignment match is.")
            mandatory_match: str = Field(..., description="What in the source code matches with the target design mandatory requirements?")
            mandatory_rating: str = Field(..., description="A rating between 1 and 5 for how good the alignment match is.")
            prohibited_match: str = Field(..., description="What in the source code is contained within prohibited items from target design prohibited list?")
            prohibited_rating: str = Field(..., description="A rating between 1 and 5 for how good the failure match is.")
            proof_match: str = Field(..., description="What in the source code matches proof points within the target design proof list?")
            proof_rating: str = Field(..., description="A rating between 1 and 5 for how good the technology match is.")

    # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5-coder:14b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)

            structured_llm = llm.with_structured_output(Analysis, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "llama-3.3-70b-versatile"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Analysis, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
            model = "gpt-4o-mini"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Analysis, 
                            method='json_mode',
                            include_raw = True)
        case 'azureopenai':
            azure_deployment="gpt-4o-mini"
            api_version="2024-10-21" 

            llm = getLLMServer(llmserver=llmserver, azure_deployment=azure_deployment, api_version=api_version)

            structured_llm = llm.with_structured_output(Analysis, 
                            method='json_mode',
                            include_raw = True)
        case _:
            print(f"Error: Unknown llmserver {llmserver}")
            return None
        
    if (verbose):
        print(f"Size of input text = {len(prompt)}")
        print(f"Estimated number of input tokens = {tokens}")
        print(f"LLM Data:{llm}")

    response = structured_llm.invoke(prompt)

    return {
         'prompt': prompt,
         'response': response,
         'errors' : errors,             # Not used yet
         'warnings' : warnings          # Not used yet
    }

#   Extract Non-Functional Requirements from Source
#   Do the whole pipeline - extract from source, log the metrics, and save the extracted content to the database
def AnalyseNonFunctionalAttributesFromSource(llmserver="ollama", fname=None, doctype=None, verbose=False):
    
    result = response = extractNFRsFromSource(llmserver=llmserver, fname=fname, verbose=True)
    if (result):
        success = parseAndSaveLLMMetrics(llmserver=llmserver, label=f"Extracting Non-Functional requirements from Source: {fname}", full_response=result, verbose=True)
        if (success):
            print("Successfully logging LLM metrics to DB")
        else:
            print("Error logging LLM metrics to DB")

        #   Parse out the relevant results
        response = result.get('response', None)
        prompt = result.get('prompt', "")
        sourcedoc=result.get('sourcedoc', "")

        direct=False
        if (direct):
            response = response['raw'].content

        NFRDict = getResponseDictionary(response=response, direct=direct)
        parseAndSaveNonFunctionalRequirementsFromSource(technologiesDict=NFRDict, sourcedoc=sourcedoc, doctype=doctype, verbose=verbose)
    else:
        print("Error extracting Non-Functional requirements from Source")

# Analse and make a comparison between generated source documentation and target design requirements
def analyseAndStoreSourceDocumentationAgainstTargetDesigns(llmserver="ollama", sourceFile=None, verbose=False):

    documentation = getSourceDocumentation(sourceFile=sourceFile)
    if (verbose):
        print("Documentation from the database:")
        print("=====================")
        print(documentation)
        print("=====================")

    sections = getTDSections()
    for target_design_name in sections:
        print(f"Analysing code against target design section: {target_design_name}")
        # targetdesign_summary = getTargetDesignContent(target_design_section=target_design_name)

        TDRequirements = getTDRequirements(TDName=target_design_name)
        targetdesign_summary  = f"Target Design Description: {TDRequirements['description']}\n"
        targetdesign_summary += f"Mandatory Requirements: {TDRequirements['mandatory']}\n"
        targetdesign_summary += f"Prohibited items: {TDRequirements['prohibitions']}\n"
        targetdesign_summary += f"Proof: {TDRequirements['proof']}\n"

        if (verbose):
            print("Comparing code against the following Target Design Requirements")
            print("=====================")
            print(targetdesign_summary)
            print("=====================")

        result = validateTargetDesignAgainstDocumentation(llmserver=llmserver, targetDesign=targetdesign_summary, documentation=documentation, verbose=verbose)
        if (result):
            success = parseAndSaveLLMMetrics(llmserver=llmserver, label=f"Comparing Source Analyses of {sourceFile} against Target Designs from LLD", full_response=result, verbose=verbose)
            if (success):
                if (verbose):
                    print("Successfully logging LLM metrics to DB")
            else:
                print("Error logging LLM metrics to DB")

            response = result.get('response', None)
            if (response):
                response = response['raw'].content
                rDict = json.loads(response)

                if (verbose):
                    print("Extracted the following result")
                    printJSON(rDict)
                    
                alignment = rDict.get('alignment', '')
                alignment_rating = rDict.get('alignment_rating', 0)
                success = rDict.get('success', '')
                success_rating = rDict.get('success_rating', 0)
                failure = rDict.get('failure', '')
                failure_rating = rDict.get('failure_rating', 0)
                technology = rDict.get('technology', '')
                technology_rating = rDict.get('technology_rating', 0)
                target_design_match = rDict.get('target_design_match', '')
                target_design_match_rating = rDict.get('target_design_match_rating', 0)

                id = insertDocumentationVersusTargetDesignAnalysis(source_documentation=documentation, target_design_name=target_design_name,
                                                                target_design_summary=targetdesign_summary, alignment=alignment, alignment_rating=alignment_rating,success=success, success_rating=success_rating, failure=failure, failure_rating=failure_rating, technology=technology, technology_rating=technology_rating, target_design_match=target_design_match, target_design_match_rating=target_design_match_rating, sourcedoc=sourceFile, verbose=False)
            else:
                print(f"Error Comparing Source Analyses against target design {target_design_name}")

# Analse and make a comparison between generated source code and target design requirements
def analyseAndStoreSourceCodeAgainstTargetDesigns(llmserver="ollama", sourceFile=None, verbose=False):

    sections = getTDSections()
    for target_design_name in sections:
        print(f"Analysing source code against target design section: {target_design_name}")
        TDRequirements = getTDRequirements(TDName=target_design_name)
        targetdesign_summary  = f"Target Design Description: {TDRequirements['description']}\n"
        targetdesign_summary += f"Mandatory Requirements: {TDRequirements['mandatory']}\n"
        targetdesign_summary += f"Prohibited items: {TDRequirements['prohibitions']}\n"
        targetdesign_summary += f"Proof: {TDRequirements['proof']}\n"

        if (verbose):
            print(f"Comparing source code from file '{sourceFile}' against the following Target Design Requirements")
            print("=====================")
            print(targetdesign_summary)
            print("=====================")

        result = validateTargetDesignAgainstSource(llmserver = llmserver, targetDesign=target_design_name, sourcedoc=sourceFile, verbose=verbose)

        if (result):
            success = parseAndSaveLLMMetrics(llmserver=llmserver, label=f"Comparing Source Code of {sourceFile} against Target Design {target_design_name} from LLD", full_response=result, verbose=verbose)
            if (success):
                if (verbose):
                    print("Successfully logging LLM metrics to DB")
            else:
                print("Error logging LLM metrics to DB")

            response = result.get('response', None)
            if (response):
                response = response['raw'].content
                rDict = json.loads(response)

                if (verbose):
                    print("Extracted the following result")
                    printJSON(rDict)

                alignment = rDict.get('alignment', '')
                alignment_rating = rDict.get('alignment_rating', 0)
                mandatory_match = rDict.get('mandatory_match', '')
                mandatory_rating = rDict.get('mandatory_rating', 0)
                prohibited_match = rDict.get('prohibited_match', '')
                prohibited_rating = rDict.get('prohibited_rating', 0)
                proof_match = rDict.get('proof_match', '')
                proof_rating = rDict.get('proof_rating', 0)

                id = insertSourceCodeVersusTargetDesignAnalysis(target_design_name=target_design_name, target_design_summary=targetdesign_summary, alignment=alignment, alignment_rating=alignment_rating,  mandatory_match=mandatory_match, mandatory_rating=mandatory_rating, prohibited_match=prohibited_match, prohibited_rating=prohibited_rating, proof_match=proof_match, proof_rating=proof_rating, sourcedoc=sourceFile, verbose=False)
            else:
                print(f"Error Comparing Source Code against target design {target_design_name}")

