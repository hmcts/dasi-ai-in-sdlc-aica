#   Process all files in the repo and try to create some documentation of what the file does
#   Allow restart from failure

from datetime import datetime
from sacclib.source import parseAndSaveExtractedDocumentation, extractSourceDocumentation
from sacclib.database import parseAndSaveLLMMetrics, getCompletedDocumentedSource 
from sacclib.utils import loadConfig
from sacclib.files import linesInFile, getSourceFilesFromRepos
import json

def parseExtractedDocumentation(response):
    sdict = json.loads(response)
    # determine if there is a 'documentation' key
    # Ollama sometimes doesn't respect the required JSON structure
    payload = sdict.get('documentation', None)

    if (payload is None):
        payload = sdict        # Likely to be a poorly formed JSON payload
    overallaim = payload.get('overallaim', None)
    successfuloutcome = payload.get('successfuloutcome', None)
    failedoutcome = payload.get('failedoutcome', None)
    functionality = payload.get('functionality', None)
    evidence = payload.get('evidence', None)
    estr=""
    if type(evidence) is dict :     # Unfortunlately, evidence is a dictionary, not a string. Convert it.
        estr += f"Use of APIs: {evidence.get('useofAPIs', None)}\n"
        estr += f"Working with Consumers and Connectivity: {evidence.get('workingwithConsumersandConnectivity', None)}\n"
        estr += f"User Authentication and Verification with IDAMs: {evidence.get('userAuthenticationandVerificationwithIDAMs', None)}\n"
        estr += f"Data Storage: {evidence.get('datastorage', None)}\n"
        estr += f"Reference Data: {evidence.get('referencedata', None)}\n"
        estr += f"Network {evidence.get('network', None)}\n"
        evidence = estr
    return { 
        'overallaim' : overallaim,
        'successfuloutcome' : successfuloutcome,
        'failedoutcome' : failedoutcome,
        'functionality' : functionality,
        'evidence' : evidence
    }

def AnalyseDocumentedSource(llmserver="ollama", fname=None, doctype=None, verbose=False):
    
    result = extractSourceDocumentation(llmserver=llmserver, fname=fname, verbose=True)
    
    if (result):
        success = parseAndSaveLLMMetrics(llmserver=llmserver, label=f"Analysing Documented Source: {fname}", full_response=result, verbose=True)
        if (success):
            print("Successfully logging LLM metrics to DB")
        else:
            print("Error logging LLM metrics to DB")

        #   Parse out the relevant results
        response = result.get('response', None)
        sourcedoc=result.get('sourcedoc', "")

        if (response):
            response = response['raw'].content

        documentation = parseExtractedDocumentation(response=response)
        # printJSON(documentation)

        parseAndSaveExtractedDocumentation(documentation=documentation, sourcedoc=sourcedoc, doctype=doctype)
    else:
        print("Error extracting Nonfunctional Requirements from Source")

#=====================================================

config=loadConfig(verbose=False)
dirs = config.get('directories', None)
if (dirs is None):
    print("Error: You need to set your directories in your config file")
    exit(1)
REPODIR=dirs.get('sourcefiles', None)
if (REPODIR is None):
    print("Error: You need to set your source file in your config file")
    exit(1)

FILESTOPROCESS=2000       # How many files would you like to process this batch?

extToIgnore=['njk']  # Files with extensions to ignore
extToInclude=[] # Files with extensions to specifically ingest
allsourcefiles= getSourceFilesFromRepos(repodir=REPODIR, extIgnore=extToIgnore, extInclude=extToInclude)      # All the files in the source directory
print(f"There are {len(allsourcefiles)} files of interest in the repository")

# Get a list of the source files that have already been processed
completed = getCompletedDocumentedSource()
print(f"{len(completed)} files have already been processed")

ignorelist = [
]
batchfiles = list(set(allsourcefiles) - set(ignorelist))        # Remove the files to ignore
batchfiles = list(set(batchfiles) - set(completed))             # Remove the ones already done
print(f"There are at most {len(batchfiles)} left to process.")
todo = batchfiles[0:FILESTOPROCESS]                             # What are you processing this batch?
print(f"The maximum number of files to process in this batch has been set to {FILESTOPROCESS}. This batch will process {len(todo)} files")

MAXLINES=9999               # Allows you to ignore files over a certain length
doctype="Source"
llmserver="ollama"
llmserver="azureopenai"

for fname in todo:
    print(f"Time is: {datetime.now()}")
    print(f"Processing {fname}")
    lines = linesInFile(fname)
    if (lines > MAXLINES):
        print(f"{fname} has {lines} lines, and exceeds the limit of {MAXLINES} lines. Ignoring...")
    else:
        AnalyseDocumentedSource(llmserver=llmserver, fname=fname, doctype=doctype, verbose=True)

