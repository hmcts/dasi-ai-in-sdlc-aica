#
#   Functionality associated with analysing and extracting content from standards documents
#

from sacclib.load import loadText
from sacclib.llm import estimatedTokensFromString, estimatedTokensRequired, getLLMServer
from pydantic import BaseModel, Field
from sacclib.database import insertTechnicalCapabilityPrincipleFromStandards

# Extract Non-functional Requirements from design documents (HLD)
def extractTechnicalCapabilitiesFromStandards(llmserver="ollama", fname=None, verbose=False):
    fileContent = loadText(fname=fname)
    if (fileContent is None):
         print(f"Unable to load text from {fname}")
         return None
    
    prompt = f"""You are an expert Software Architect with over 30 years of experience designing and building enterprise systems within industry.  You have been asked to analyse a document to provide evidence for testimony in a multi-million dollar lawsuit.

        Between the triple backticks below is the document containing a list of technical capability principles that will guide the development of the software delivery function.

        Collate those technical capabilty principles and summarise them.
        
        Here is the document to analyse:

            ```
            {fileContent}
           ```

        For each principle, get the technical capabilty principle name or phrase that is used to identify the technical capabilty principle.  Then extract the description. The description is a broader summary of the technical capabilty principle providing examples of the benefits of the principle, evidence that the technical capabilty principle is working, and more detail about how the technical capabilty principle might be used.  Use as many words as you need to describe it comprehensively. Copy the content verbatim if you need.

        Check your work.

        You must provide your answer as a JSON dictionary in the following format:
        
        {{
            "principles" : [
                {{
                    "principle_name": "<Principle Name>",
                    "principle_description": "<Principle Description>",
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

    class Principle(BaseModel):
            principle: str = Field(..., title='principle', description="The name or phrase that is used to identify the principle.")
            description: str = Field(..., title='description', description="A description of the principle.")

    class Principles(BaseModel):
        principles: list[Principle] = Field([], title='principles', description="List of principles.")

     # Allow a choice of LLM Servers to use
    match llmserver:
        case 'ollama':
            model = "qwen2.5-coder:7b"
            model = "qwen2.5-coder:14b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=num_ctx)

            structured_llm = llm.with_structured_output(Principles, 
                            method='json_schema',
                            include_raw = True)
        case 'groq':
            model = "qwen-2.5-32b"
            model = "qwen-2.5-coder-32b"
            model = "llama-3.3-70b-versatile"

            llm = getLLMServer(llmserver=llmserver, model=model)

            structured_llm = llm.with_structured_output(Principles, 
                            method='json_mode',
                            include_raw = True)
        case 'openai':
            model = "o3-mini"
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
def parseAndSaveTechnicalCapabilitiesFromStandards(principleDict=None, sourcedoc=None, doctype=None):
    principles=principleDict.get('principles', None)
    if (principleDict):
        for p in principles:
            principle = p.get('principle_name', None)
            description = p.get('principle_description', None)
            status = insertTechnicalCapabilityPrincipleFromStandards(principle=principle, description=description, sourcedoc=sourcedoc, doctype=doctype, verbose=True)
            if (not status):
                print(f"Error adding nfrsection as nonfunctional requirement... {principle}")



