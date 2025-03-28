#
# This allows document specific items to be ingested 
#
from sacclib.standards import extractTechnicalCapabilitiesFromStandards, parseAndSaveTechnicalCapabilitiesFromStandards
from sacclib.design import  (
    parseAndSaveArchitecturalDesignDecisions, extractArchitecturalDecisionsFromDesign, 
    extractArchitecturePrinciplesFromDesign, parseAndSaveArchitecturePrinciples, 
    extractTDSectionRequirementsFromLLD, parseAndSaveTDSectionRequirementsFromLLD
)

from sacclib.database import parseAndSaveLLMMetrics
from sacclib.utils import getResponseDictionary, loadConfig, printJSON
from sacclib.files import fileExists

#=====================================================

config=loadConfig(verbose=False)
dirs = config.get('directories', None)
if (dirs is None):
    print("Error: You need to set your directories in your config file")
    exit(1)
DESIGNDOCS=dirs.get('designDocs', None)
if (DESIGNDOCS is None):
    print("Error: You need to set your 'designDocs' value in your config file")
    exit(1)
STANDARDSDOCS=dirs.get('standardsDocs', None)
if (STANDARDSDOCS is None):
    print("Error: You need to set your 'standardsDocs' value in your config file")
    exit(1)

# Analyse and ingest the technical Capability Principles from the HMCTS Technical Strategy
def AnalyseTechnicalCapabilitiesFromStandards(llmserver="ollama", fname=None, doctype=None, verbose=False):

    if (verbose):
        print(f"LLM Server:      {llmserver}")
        print(f"Ingesting file:  {fname}")

    if (fileExists(fname) is not True):
        print(f"{fname} is not reachable")
        return False

    result = extractTechnicalCapabilitiesFromStandards(llmserver=llmserver, fname=fname, verbose=verbose)

    if (result):
        success = parseAndSaveLLMMetrics(llmserver=llmserver, label=f"Extracting Technical Capabilities from Standards: {fname}", full_response=result, verbose=True)
        if (success):
            print("Successfully logging LLM metrics to DB")
        else:
            print("Error logging LLM metrics to DB")

        #   Parse out the relevant results
        response = result.get('response', None)
        sourcedoc=result.get('sourcedoc', "")

        direct=False
        if (direct):
            response = response['raw'].content

        principleDict = getResponseDictionary(response=response, direct=direct)
        if (verbose):
            print("Raw extracted content is:")
            printJSON(principleDict)

        parseAndSaveTechnicalCapabilitiesFromStandards(principleDict=principleDict, sourcedoc=sourcedoc, doctype=doctype)
    else:
        print("Error extracting Technical Capabilities from Standards")

# Analyse and ingest the Architecture Decisions from the LHD (compliance section)
def AnalyseArchitectureDecisionsFromDesign(llmserver="ollama", fname=None, doctype=None, verbose=False):

    if (verbose):
        print(f"LLM Server:      {llmserver}")
        print(f"Ingesting file:  {fname}")

    if (fileExists(fname) is not True):
        print(f"{fname} is not reachable")
        return False

    result = extractArchitecturalDecisionsFromDesign(llmserver=llmserver, fname=fname, verbose=True)

    if (result):
        success = parseAndSaveLLMMetrics(llmserver=llmserver, label=f"Extracting Architectural Descisions from Design: {fname}", full_response=result, verbose=True)
        if (success):
            print("Successfully logging LLM metrics to DB")
        else:
            print("Error logging LLM metrics to DB")

        #   Parse out the relevant results
        response = result.get('response', None)
        sourcedoc=result.get('sourcedoc', "")

        direct=False
        if (direct):
            response = response['raw'].content

        decisionDict = getResponseDictionary(response=response, direct=direct)
        if (verbose):
            print("Raw extracted content is:")
            printJSON(decisionDict)

        parseAndSaveArchitecturalDesignDecisions(decisionDict=decisionDict, sourcedoc=sourcedoc, doctype=doctype)
    else:
        print("Error Architectural Descisions from Design")

# Analyse and ingest the Architecture Principles from the LHD (compliance section)
def AnalyseArchitecturePrinciplesFromDesign(llmserver="ollama", fname=None, doctype=None, verbose=False):

    if (verbose):
        print(f"LLM Server:      {llmserver}")
        print(f"Ingesting file:  {fname}")

    if (fileExists(fname) is not True):
        print(f"{fname} is not reachable")
        return False

    result = extractArchitecturePrinciplesFromDesign(llmserver=llmserver, fname=fname, verbose=True)

    if (result):
        success = parseAndSaveLLMMetrics(llmserver=llmserver, label=f"Extracting Architecture Principles from Design: {fname}", full_response=result, verbose=True)
        if (success):
            print("Successfully logging LLM metrics to DB")
        else:
            print("Error logging LLM metrics to DB")

        #   Parse out the relevant results
        response = result.get('response', None)
        sourcedoc=result.get('sourcedoc', "")

        direct=False
        if (direct):
            response = response['raw'].content

        principleDict = getResponseDictionary(response=response, direct=direct)
        if (verbose):
            print("Raw extracted content is:")
            printJSON(principleDict)

        parseAndSaveArchitecturePrinciples(principleDict=principleDict, sourcedoc=sourcedoc, doctype=doctype)
    else:
        print("Error extracting Architecture Principles from Design")

def AnalyseTDSectionRequirementsFromLLD(llmserver="ollama", fname=None, doctype=None, verbose=False):
    
    result = extractTDSectionRequirementsFromLLD(llmserver=llmserver, fname=fname, verbose=True)
    
    if (result):
        success = parseAndSaveLLMMetrics(llmserver=llmserver, label=f"Extracting Target Design Requirements from LLD: {fname}", full_response=result, verbose=True)
        if (success):
            print("Successfully logging LLM metrics to DB")
        else:
            print("Error logging LLM metrics to DB")

        #   Parse out the relevant results
        response = result.get('response', None)
        sourcedoc=result.get('sourcedoc', "")

        direct=False
        if (direct):
            response = response['raw'].content

        rDict = getResponseDictionary(response=response, direct=direct)
        # printJSON(rDict)

        parseAndSaveTDSectionRequirementsFromLLD(requirementsDict=rDict, sourcedoc=sourcedoc, doctype=doctype)
    else:
        print("Error Extracting Target Design Requirements from LLD")


verbose=True
llmserver="azureopenai"

# Ingest Technical Capabilities from the HMCTS Technology Strategy (in-house section)
fname=f"{STANDARDSDOCS}/in-house-software-delivery.docx"
print(f"Extracting and ingesting Technical Capabilities from {fname}")
doctype="Standard"
# AnalyseTechnicalCapabilitiesFromStandards(llmserver=llmserver, fname=fname, doctype=doctype, verbose=verbose)

# Ingest Architecture Decisoins from the HLD (compliance section)
fname=f'{DESIGNDOCS}/Compliance.docx'
print(f"Extracting and ingesting Architecture Decisions from {fname}")
doctype="HLD"

# AnalyseArchitectureDecisionsFromDesign(llmserver=llmserver, fname=fname, doctype=doctype, verbose=verbose)


# Ingest Architecture Principles from the HLD (compliance section)
fname=f'{DESIGNDOCS}/Compliance.docx'
print(f"Extracting and ingesting Architecture Prnciples from {fname}")
doctype="HLD"

# Ingest Target Design Requirements from the LLD
fname=f'{DESIGNDOCS}/CATH LLD.docx'
print(f"Extracting and ingesting Target Design Requirements from {fname}")
doctype="LLD"
llmserver="ollama"  # Using Ollama locally - change to AzureOpenAI as needed
AnalyseTDSectionRequirementsFromLLD(llmserver=llmserver, fname=fname, verbose=verbose)

llmserver="azureopenai"







