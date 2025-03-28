#
#   Functionality associated with analysing and extracting content from design documents
#

from sacclib.load import loadDocument, loadText, loadFile
from sacclib.utils import printJSON, escapeCurlies, escapeTripleQuotes, getResponseDictionary
from sacclib.llm import estimatedTokensFromString, estimatedTokensRequired
from pydantic import BaseModel, Field
from typing import Optional
from sacclib.files import fileExists

from sacclib.database import ( 
    insertArchitectureDesignDecision, 
    insertArchitecturePrinciple, 
    insertNFRFromDesign,
    parseAndSaveLLMMetrics,
    insertTargetDesignSectionFromLLD,
    insertTargetDesignSubsectionFromLLD,
    insertTargetDesignRequirement,
)
from sacclib.utils import toISODate
from sacclib.llm import getLLMServer
import os

# load_dotenv()   # Load .env values

# Extract architectural decisions from design documents (HLD)
def extractArchitecturalDecisionsFromDesign(llmserver="ollama", fname=None, verbose=False):
    
    fileContent = loadText(fname=fname)
    if (fileContent is None):
         print(f"Unable to load text from {fname}")
         return None

    prompt = f"""You are an expert Software Architect with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse a document to provide evidence for testimony in a multi-million dollar lawsuit.

        Between the triple backticks below is the document containing the high-level design of the architecture. Count the number of architectural decisions contained in that document and analyse each to summarise their details.  Return an analysis for every architectural decision.

            ```
            {fileContent}
           ```        

        For each architectural decision, provide the decision itself, an identifier, a date of the architectural decision, and an excerpt of the text where you found it. In addition you must provide evidence as to why this architectural decision was made.

        Return every architectural decision within the document. Do not miss any.  Reflect on why you think you have retrieved every architectural decision, and then validate your thinking to ensure that this is true. 

        Check your work.

        You must provide your answer as a JSON dictionary in the following format:

        {{
            "decisions": [
                            {{
                                "architecturaldecision": "<Architectural Decision>",
                                "ADID": "<AD Identity>",
                                "date": "<Date of Decision>",
                                "who": "<Who decided>",
                                "evidence": "<Evidence>",
                                "excerpt": "<excerpt>"
                            }},
                        ]
        }}
        """

    errors=[]       # Errors, can be  added to this
    warnings=[]     # Warnings etc can be  added to this

    tokens = estimatedTokensFromString(prompt)
    num_ctx = estimatedTokensRequired(tokenEstimate=tokens)

    class Decision(BaseModel):
            architecturaldecision: str = Field(..., description="What architectural decision does this support?")
            ADID: str = Field(..., description="The identifier of the architectural decision.")
            date: str = Field(..., description="The date of the architectural decision.")
            who: Optional[str] = Field(..., description="Who decided this?")
            evidence: Optional[str] = Field(..., description="What evidence is there to supports this decision being included?")
            excerpt: str = Field(..., description="An excerpt of the text where this architectural decision was found.")

    class ArchitecturalDecisions(BaseModel):
        decisions: list[Decision] = Field([], description="List of architectural decisions.")

    # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5-coder:7b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)
           
            structured_llm = llm.with_structured_output(ArchitecturalDecisions, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "llama-3.3-70b-versatile"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(ArchitecturalDecisions, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
            model = "gpt-4o-mini"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(ArchitecturalDecisions, 
                            method='json_mode',
                            include_raw = True)
        case 'azureopenai':
            azure_deployment="gpt-4o-mini"
            api_version="2024-10-21" 

            llm = getLLMServer(llmserver=llmserver, azure_deployment=azure_deployment, api_version=api_version)

            structured_llm = llm.with_structured_output(ArchitecturalDecisions, 
                            method='json_mode',
                            include_raw = True)
        case _:
            print(f"Error: Unknown llmserver {llmserver}")
            return None
        
    if (verbose):
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

# Given a dictionary of architectural design decisions, insert the content into the database
def parseAndSaveArchitecturalDesignDecisions(decisionDict, sourcedoc, doctype):
    decisions=decisionDict.get('decisions', None)
    if (decisions):
        for d in decisions:
            adid = d.get('ADID', None)
            decision = d.get('architecturaldecision', None)
            when = d.get('date', None)
            if (when):
                when = toISODate(when)
            who = d.get('who', None)
            evidence = d.get('evidence', None)
            excerpt = d.get('excerpt', None)
            print(f"ID: {adid}: Decision = '{decision}")
            status = insertArchitectureDesignDecision(ADID=adid, decision=decision, design_date=when, who=who, evidence=evidence, excerpt=excerpt, sourcedoc=sourcedoc, doctype=doctype)
            if (not status):
                print(f"Error adding Architectural Design Decision... {adid}")

# Extract architecture Principles from design documents (HLD)
def extractArchitecturePrinciplesFromDesign(llmserver = "ollama", fname=None, verbose=False):
    fileContent = loadText(fname=fname)
    if (fileContent is None):
         print(f"Unable to load text from {fname}")
         return None
    
    prompt = f"""You are an expert Software Architect with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse a document to provide evidence for testimony in a multi-million dollar lawsuit.

        Between the triple backticks below is the document containing the high-level design of the architecture. Count the number of architecture principles contained in that document and analyse each to summarise their details.  Return an analysis for every architecture principle.

            ```
            {fileContent}
           ```        

        For each architecture principle, provide the architecture principle itself, and a description of architecture principle. For the description, try to mirror the exact wording found in the document. In addition you must also provide evidence for why this architecture principle was chosen, and an excerpt of the text where this architeture principle was found.

        Check your work.

        You must provide your answer as a JSON dictionary in the following format:

        {{
        
            "principles": [
                {{
                    "principle": "<Architecture Principle>",
                    "description": "<Architecture Principle Description>",
                    "evidence": "<Architecture Principle Evidence>",
                    "excerpt": "<Excerpt of the text>"
                }},
        }}

    """

    errors=[]       # Errors, can be  added to this
    warnings=[]     # Warnings etc can be  added to this

    tokens = estimatedTokensFromString(prompt)
    num_ctx = estimatedTokensRequired(tokenEstimate=tokens)
    class ArchitecturePrinciple(BaseModel):
            principle: str = Field(..., title='principle', description="The architecture principle.")
            description: str = Field(..., title='description', description="A full and detailed description of the architecture principle.")
            evidence: Optional[str] = Field(..., title='evidence', description="WWhat evidence is there to support this architecture principle being included?")
            excerpt: str = Field(..., title='excerpt', description="An excerpt of the text where this architecture principle was found.")

    class Principles(BaseModel):
        principles: list[ArchitecturePrinciple] = Field([], title='principles', description="List of architecture principles.")

    # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5-coder:14b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)

            structured_llm = llm.with_structured_output(Principles, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "llama-3.3-70b-versatile"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Principles, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
            model = "gpt-4o-mini"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Principles, 
                            method='json_mode',
                            include_raw = True)
        case 'azureopenai':
            azure_deployment="gpt-4o-mini"
            api_version="2024-10-21" 

            llm = getLLMServer(llmserver=llmserver, azure_deployment=azure_deployment, api_version=api_version)

            structured_llm = llm.with_structured_output(Principles, 
                            method='json_mode',
                            include_raw = True)
        case _:
            print(f"Error: Unknown llmserver {llmserver}")
            return None

    if (verbose):
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

# Given a dictionary of architecture principles, insert the content into the database
def parseAndSaveArchitecturePrinciples(principleDict, sourcedoc, doctype):
    principles=principleDict.get('principles', None)
    if (principles):
        for p in principles:
            principle = p.get('principle', None)
            description = p.get('description', None)
            evidence = p.get('evidence', None)
            excerpt = p.get('excerpt', None)
            status = insertArchitecturePrinciple(principle=principle, description=description, evidence=evidence, excerpt=excerpt, sourcedoc=sourcedoc, doctype=doctype)
            if (not status):
                print(f"Error adding Architecture Principle... {principle}")

# Extract Non-functional Requirements from design documents (HLD)
def extractNFRsFromDesign(llmserver="ollama", fname=None, verbose=False):
    fileContent = loadText(fname=fname)
    if (fileContent is None):
         print(f"Unable to load text from {fname}")
         return None
    
    prompt = f"""You are an expert Software Architect with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse a document to provide evidence for testimony in a multi-million dollar lawsuit.

        Between the triple backticks below is the document containing a list of non-functional Requirements. Analyse each non-functional requirements to summarise their details.

        Here is an example table containing some fictional non-Functional Requirements.  Use this to help locate other non-functional requirements in the document to analyse.

        +----------+-----------------+-------------------+----------------+------------------------------+------------+
        |  NFR Ref |  NFR Section    |  NFR SubSection   | Categorisation | Requirement Description     | Priority   |
        +----------+-----------------+-------------------+----------------+-----------------------------+------------+
        | XYZ-01   |  ...            | ...               |  ...           | All user interfaces must... | ...        |
        | XYZ-03   |  ...            | ...               |  ...           | Solution must be able to .. | ...        |
        | ABC-01   |  ...            | ...               |  ...           | System must be accessible.. | ...        |
           ...
           ...
        +----------+-----------------+-------------------+----------------+-----------------------------+------------+

        NFS Sections could include values such as:
        - Accessibility
        - Audit
        - Availability
        - Supportability
        - Data
        - Interoperability
        - Maintainability
        - Operability
        - Performance
        - Volumetrics
        - Reliability
        - Scalability
        - Security
        - Service
        - Continuity
        - Useability

        NFS Subsections could include values such as:
        - Accessibility
        - Internationalisation
        - Audit Trail
        - Location
        - High Availability
        - Operational
        - Resilience
        - Data management
        - Integrity
        - Integration
        - Availability
        - Audit Logs
        - Response time
        - Bandwidth
        - Monitoring
        - Volume
        - Capacity
        - Infrastructure
        - Costs
        - Access Control
        - Control
        - Continuity
        - Traceability
        - Consistency

        Priority could include values such as:
        - Mandatory
        - Must
        - High
        - Medium
        - Low

        Non-functional requirements may include things such as:
        - accessibility
        - availability
        - resilience
        - supportability
        - operational stability
        - data integrity and protection
        - interopability and integration
        - maintainability
        - performance
        - monitoring
        - capacity
        - security
        - service continuity
        - anything else you think might be relevant
        
        Here is the document to analyse:

            ```
            {fileContent}
           ```

        For each non-functional requirement, provide the NFR Reference, NFR Section, NFR subsection, a description of the non-functional requirement, a priority, and an excerpt of the text where you found it.
        
        In addition you must provide a evidence for why this non-functional requirement was chosen.

        Check your work.

        You must provide your answer as a JSON dictionary in the following format:
        
        {{
            "nonfunctionalrequirements" : [
                {{
                    "nfrREF": "<NFR Reference>",
                    "nfrsection": "<NFR Section>",
                    "nfrsubsection": "<NFR Subsection>",
                    "description": "<Description>",
                    "priority": "<Priority>",
                    "evidence": "<Evidence>",
                    "excerpt": "<Excerpt>"         
                }}
            ]        
        }}
    """

    errors=[]       # Errors, can be  added to this
    warnings=[]     # Warnings etc can be  added to this

    tokens = estimatedTokensFromString(prompt)
    num_ctx = estimatedTokensRequired(tokenEstimate=tokens)

    if (verbose):
        print(f"Size of input text = {len(prompt)}")
        print(f"Estimated number of tokens = {tokens}")
        print(f"Setting num_ctx to be {num_ctx}")

    class NFR(BaseModel):
            nfrREF: str = Field(..., title='nfrREF', description="The NFR reference.")
            nfrsection: str = Field(..., title='nfrsection', description="The NFR section.")
            nfrsubsection: Optional[str] = Field(..., title='nfrsubsection', description="The NFR subsection. If there isn't one this answer is empty")
            description: str = Field(..., title='description', description="The non-functional requirement description.")
            priority: str = Field(..., title='priority', description="The priority for the non-functional requirement.")
            evidence: Optional[str] = Field(..., title='evidence', description="What evidence is there to supports this non-functional requirement being included?")
            excerpt: str = Field(..., title='excerpt', description="An excerpt of the text where this non-functional requirement was found.")

    class NFRs(BaseModel):
        nonfunctionalrequirements: list[NFR] = Field([], title='nonfunctionalrequirements', description="List of non-functional requirements.")

     # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5-coder:7b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)

            structured_llm = llm.with_structured_output(NFRs, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "llama-3.3-70b-versatile"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(NFRs, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
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
            print(f"Error: Unknown llmserver {llmserver}")
            return None

    if (verbose):
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

# Given a dictionary of architectural design decisions, insert the content into the database
def parseAndSaveNFRsFromDesign(NFRDict=None, sourcedoc=None, doctype=None):
    NFRs=NFRDict.get('nonfunctionalrequirements', None)
    if (NFRs):
        for n in NFRs:
            nfrREF = n.get('nfrREF', None)
            nfrsection = n.get('nfrsection', None)
            nfrsubsection = n.get('nfrsubsection', None)
            description = n.get('description', None)
            priority = n.get('priority', None)
            evidence = n.get('evidence', None)
            excerpt = n.get('excerpt', None)

            # We are going to insert up to two rows for each NFR, because querying against subsection/section makes no sense in the real world
            # They are both just examples of a term for nonfunctional requirement.

            if (nfrsection):    # Then insert it as a nonfunctional requirement
                status = insertNFRFromDesign(nfrREF=nfrREF, nfr= nfrsection, description=description, priority=priority, evidence=evidence, excerpt=excerpt, sourcedoc=sourcedoc, doctype=doctype, verbose=True)
                if (not status):
                    print(f"Error adding nfrsection as nonfunctional requirement... {nfrREF}")

            if (nfrsubsection):    # Then insert it as a nonfunctional requirement
                status = insertNFRFromDesign(nfrREF=nfrREF, nfr=nfrsubsection, description=description, priority=priority, evidence=evidence, excerpt=excerpt, sourcedoc=sourcedoc, doctype=doctype, verbose=True)
                if (not status):
                    print(f"Error adding nfrsubsection as nonfunctional requirement... {nfrREF}")

# Extract Target Design Requirements from the LLD 
def extractTDSectionRequirementsFromLLD(llmserver = "ollama", fname=None, verbose=False):
    fileContent = loadText(fname=fname)
    if (fileContent is None):
         print(f"Unable to load text from {fname}")
         return None
    
    prompt = f"""You are an expert Software Architect with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse a document to provide evidence for testimony in a multi-million dollar lawsuit.

        Between the triple backticks below is the document containing the low-level design of the architecture. Extract the entire API Specification, Consumers and Connectivity, User Authentication and Verification with IDAMS, Data Storage, Reference Data, and Network target design areas.  Do not extract anything before these, and do not include any sections after them.
         
        ```
            {fileContent}
        ```        

        Group the contents of each subsections into distinct subject areas and given these subject areas a label with the following attributes:

        1) Subsection name
        2) Describe in up to 400 words what this subsection is responsible for.
        3) Describe in up to 400 words what things this subsection mandates? In other words, what needs to happen to conform to this subsection?
        4) Describe in up to 400 words what things this subsection prohibits? In other words, what are you not allowed to do to conform to this section?
        5) Describe in up to 400 words what proof is needed to substantiate that this subsection is being conformed to.

        Check your work.

        You must provide your answer as a JSON dictionary in the following format:       

        {{
            "requirements": [
                {{
                    "subsection_name": "<Subsection name>",
                    "subsection_description": "<Detailed description>",
                    "subsection_must_haves": "<Detailed mandates>",
                    "subsection_prohibits": "<Detailed prohibitions>"
                    "proof": "<Proof needed>"
                }},
        }} 

     """

    errors=[]       # Errors, can be  added to this
    warnings=[]     # Warnings etc can be  added to this

    tokens = estimatedTokensFromString(prompt)
    num_ctx = estimatedTokensRequired(tokenEstimate=tokens)
    class DataStorageRequirement(BaseModel):
            subsection_name: str = Field(..., description="The subsection name.")
            subsection_description: str = Field(..., description="A full and detailed description of the subsection.")
            subsection_must_haves: str = Field(..., description="A full and detailed summary of what the subsection mandates to be compliant.")
            subsection_prohibits: str = Field(..., description="A full and detailed summary of what the subsection prohibits to be compliant.")
            proof: str = Field(..., description="What proof is needed to substantiate compliance?")

    class DataStorageRequirements(BaseModel):
        requirements: list[DataStorageRequirement] = Field([], description="List of architecture principles.")

    # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5:7b"
            model = "gemma3:27b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)

            structured_llm = llm.with_structured_output(DataStorageRequirements, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "llama-3.3-70b-versatile"
            model = "qwen-qwq-32b"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(DataStorageRequirements, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
            model = "gpt-4o-mini"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(DataStorageRequirements, 
                            method='json_mode',
                            include_raw = True)
        case 'azureopenai':
            azure_deployment="gpt-4o-mini"
            api_version="2024-10-21" 

            llm = getLLMServer(llmserver=llmserver, azure_deployment=azure_deployment, api_version=api_version)

            structured_llm = llm.with_structured_output(DataStorageRequirements, 
                            method='json_mode',
                            include_raw = True)
        case _:
            print(f"Error: Unknown llmserver {llmserver}")
            return None

    if (verbose):
        print(f"Estimated number of tokens = {tokens}")
        print(f"LLM Data:{llm}")

    response = structured_llm.invoke(prompt)

    return {
         'prompt': prompt,
         'response': response,
         'sourcedoc': fname,
         'errors' : errors,             # Not used yet
         'warnings' : warnings          # Not used yet
    }

def parseAndSaveTDSectionRequirementsFromLLD(requirementsDict, sourcedoc, doctype):
    # print(requirementsDict)
    requirements=requirementsDict.get('requirements', None)
    if (requirements):
        for r in requirements:
            name = r.get('subsection_name', None)
            description = r.get('subsection_description', None)
            mandatory = r.get('subsection_must_haves', None)
            probitions = r.get('subsection_prohibits', None)
            proof = r.get('proof', None)
            status = insertTargetDesignRequirement(name=name, description=description, mandatory=mandatory, prohibitions=probitions, proof=proof, sourcedoc=sourcedoc, doctype=doctype)
            if (not status):
                print(f"Error adding Target Design Requirement... {name}")

# Analyse and ingest the NFRs from a design document (typically HLD)
def IngestNFRsFromDesign(llmserver="ollama", fname=None, doctype=None, verbose=False):

    if (verbose):
        print(f"LLM Server:      {llmserver}")
        print(f"Ingesting file:  {fname}")

    if (fileExists(fname) is not True):
        print(f"{fname} is not reachable")
        return False
    
    result = extractNFRsFromDesign(llmserver=llmserver, fname=fname, verbose=True)
    if (result):
        success = parseAndSaveLLMMetrics(llmserver=llmserver, label=f"Extracting NFRs from Design: {fname}", full_response=result, verbose=True)
        if (success):
            print("Successfully logging LLM metrics to DB")
        else:
            print("Error logging LLM metrics to DB")

        response = result.get('response', None)
        sourcedoc=result.get('sourcedoc', "")

        direct=False
        if (direct):
            response = response['raw'].content

        NFRDict = getResponseDictionary(response=response, direct=direct)
        print(NFRDict['count'])
        # printJSON(NFRDict)
        parseAndSaveNFRsFromDesign(NFRDict=NFRDict, sourcedoc=sourcedoc, doctype=doctype)
        return True
    else:
        print("Error extracting nonfunctional requirements from Design")
        return False

def extractTargetDesignFromLLD(llmserver="ollama", fname=None, verbose=False):
    
    fileContent = loadText(fname=fname)
    if (fileContent is None):
         print(f"Unable to load text from {fname}")
         return None

    prompt = f"""You are an expert Software Architect with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse a document to provide evidence for testimony in a multi-million dollar lawsuit.

        Between the triple backticks below is the document containing the low-level design of the architecture. 

        The target design is a collection of sections and subsections each describing a low level design approach for a piece of technology or architectural pattern. The list of sections is likely to be found in a table of contents beneath a major heading of 'Target Design'.

        'Target Design' is not to be considered a section in its own right.  Look at the sections and subsections beneath this.  
    
        Extract every section and then each subsection beloning to those sections. Each section and subsection will have an identifying number reflecting its place in the design hierarchy, and each will describe various technology focus areas.

        Count the number of sections contained in the document and analyse each to summarise the section details. For each section, count the number of subsections, and analyse each to summarise the subsection details. 
        
        Return an analysis for every section, and an analysis for each associated subsection.

            ```
            {fileContent}
           ```        

        For each section, provide its name, section number, and a comprehensive description.

        For each associated subsection, provide its name and subsection number. Also provide comprehensive subsection description of between 200-300 words, which may be arrived at through the summarisation of diagrams or tables if necessary. Finally, provide evidence as to why you think it is a valid subsection, and an excerpt within the text where you found the subsection.

        Reflect on why you think you have retrieved every section and subsection, and then validate your thinking to ensure that this is true. 

        Check your work.

        You must provide your answer as a JSON dictionary in the following format:

        {{
            "sections": [
                {{
                    "section": "<Target design section>",
                    "sectionnumber": "<Target design section number>",
                    "description": "<Target design section description>",
                    "subsections": [
                        {{
                            "subsection": "<Target design subsection name>",
                            "subsectionnumber": "<Target design subsection number>",
                            "description": "<Target design subsection description>",
                            "evidence": "<Target design subsection evidence>",
                            "excerpt": "<Target design subsection excerpt>"
                        }}
                    ]
                }}
            ]
        }}

    """   
    
    errors=[]       # Errors, can be  added to this
    warnings=[]     # Warnings etc can be  added to this

    tokens = estimatedTokensFromString(prompt)
    num_ctx = estimatedTokensRequired(tokenEstimate=tokens)

    class Subsection(BaseModel):
            subsection: str = Field(..., description="The name of the target target design subsection.")
            subsectionnumber: str = Field(..., description="A number preceeding the subsection name to help identify its location in the document.")
            description: str = Field(..., description="A comprehensive description of the target design subsection.")
            evidence: Optional[str] = Field(..., description="What evidence is there to support this target design subsection being included?")
            excerpt: str = Field(..., description="An excerpt of the text where this target design subsection was found.")

    class Section(BaseModel):
        section: str  = Field(..., description="The name of the Target Design Section.")
        sectionnumber: str = Field(..., description="A number preceeding the subsection name to help identify its location in the document.")
        description: str  = Field(..., description="A comprehensive description of the Target Design Section.")
        subsections: list[Subsection] = Field([], description="List of Target Design Subsections.")

    class Sections(BaseModel):
        sections: list[Section] = Field([], description="List of Target Design Sections.")

    # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5-coder:7b"
            model = "qwen2.5-coder:14b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)

            structured_llm = llm.with_structured_output(Sections, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "qwen-2.5-32b"
            model = "qwen-2.5-coder-32b"
            model = "llama-3.3-70b-versatile"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Sections, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
            model = "o3-mini"
            model = "gpt-4o-mini"
            model = "gpt-4o"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Sections, 
                            method='json_mode',
                            include_raw = True)
            
        case 'azureopenai':
            azure_deployment="gpt-4o-mini"
            api_version="2024-10-21" 

            llm = getLLMServer(llmserver=llmserver, azure_deployment=azure_deployment, api_version=api_version)

            structured_llm = llm.with_structured_output(Sections, 
                            method='json_mode',
                            include_raw = True)
        case _:
            print(f"Error: Unknown llmserver {llmserver}")
            return None
        
    if (verbose):
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

# Given a dictionary of Target Designs, insert the content into the database
# This is ging to insert into two tables
# Target Design Sections and Target Design Subsections 

def parseAndSaveTargetDesigns(sectionsDict=None, sourcedoc=None, doctype=None, verbose=False):
    sections=sectionsDict.get('sections', None)
    if (sections):
        for s in sections:
            sectionname = s.get('section', None)
            sectionnumber = s.get('sectionnumber', None)
            sectiondescription = s.get('description', None)
            subsections = s.get('subsections', [])

            if (len(subsections) == 0):
                subsections = [
                    {
                        'subsection': 'No subsections',
                        'subsectionnumber': 'No Section Number',
                        'description': 'There are no subsections'
                    }
                ]
                print(subsections)

            # We are going to insert a row per section
            status = insertTargetDesignSectionFromLLD(section_name=sectionname, section_number=sectionnumber,
                                                    section_description=sectiondescription, sourcedoc=sourcedoc, doctype=doctype, verbose=verbose)
            if (not status):
                print(f"Error adding Target Design Section ... {sectionname}")
            else:
                for ss in subsections:
                    subsectionname = ss.get('subsection', None)
                    subsectionnumber = ss.get('subsectionnumber', None)
                    subsectiondescription = ss.get('description', None)
                    subsectionevidence = ss.get('evidence', None)
                    subsectionexcerpt = ss.get('excerpt', None)

                    status = insertTargetDesignSubsectionFromLLD(section_name=sectionname, section_number=sectionnumber,
                                                                subsection_name=subsectionname, subsection_number=subsectionnumber,
                                                                subsection_description=subsectiondescription, subsection_evidence=subsectionevidence, 
                                                                subsection_excerpt=subsectionexcerpt, sourcedoc=sourcedoc, doctype=doctype, verbose=verbose)
                    if (not status):
                        print(f"Error adding Target Design subSection ... {sectionname} / {subsectionname} [{subsectionnumber}] ")

