#   Process all files in the repo to extract functional attributes from Source
#   Allow restart from failure

from datetime import datetime
from sacclib.source import extractFunctionalAttributesFromSource, parseAndSaveFunctionalRequirementsFromSource
from sacclib.database import parseAndSaveLLMMetrics, getCompletedFunctionalAttributesSource
from sacclib.utils import getResponseDictionary, loadConfig
from sacclib.files import linesInFile, getSourceFilesFromRepos

def AnalyseFunctionalAttributesFromSource(llmserver="ollama", fname=None, doctype=None, verbose=False):
    
    result = extractFunctionalAttributesFromSource(llmserver=llmserver, fname=fname, verbose=True)
    
    if (result):
        success = parseAndSaveLLMMetrics(llmserver=llmserver, label=f"Extracting Functional Attributes from Source: {fname}", full_response=result, verbose=True)
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

        technologiesDict = getResponseDictionary(response=response, direct=direct)
        # printJSON(functionalReqsDict)

        parseAndSaveFunctionalRequirementsFromSource(technologiesDict=technologiesDict, sourcedoc=sourcedoc, doctype=doctype)
    else:
        print("Error extracting Functional Attriutes from Source")

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

FILESTOPROCESS=500  # How many files would you like to process this batch?

extToIgnore=['njk']  # Files with extensions to ignore
extToInclude=[] # Files with extensions to specifically ingest
allsourcefiles= getSourceFilesFromRepos(repodir=REPODIR, extIgnore=extToIgnore, extInclude=extToInclude)      # All the files in the source directory
print(f"There are {len(allsourcefiles)} files of interest in the repository")

completed = getCompletedFunctionalAttributesSource()    # Get a list of the source files that have already been processed
print(f"{len(completed)} files have already been processed")

ignorelist = []
batchfiles = list(set(allsourcefiles) - set(ignorelist))        # Remove the files to ignore
batchfiles = list(set(batchfiles) - set(completed))             # Remove the ones already done
print(f"There are at most {len(batchfiles)} left to process.")
todo = batchfiles[0:FILESTOPROCESS]                             # What are you processing this batch?
print(f"The maximum number of files to process in this batch has been set to {FILESTOPROCESS}. This batch will process {len(todo)} files")

MAXLINES=9999               # Allows you to ignore files over a certain length
doctype="Source"
llmserver="openai"
llmserver="azureopenai"

for fname in todo:
    print(f"Time is: {datetime.now()}")
    print(f"Processing {fname}")
    lines = linesInFile(fname)
    if (lines > MAXLINES):
        print(f"{fname} has {lines} lines, and exceeds the limit of {MAXLINES} lines. Ignoring...")
    else:
        AnalyseFunctionalAttributesFromSource(llmserver=llmserver, fname=fname, doctype=doctype, verbose=True)

