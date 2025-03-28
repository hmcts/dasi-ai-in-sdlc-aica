# For all files that have been analysed to generate documentation, compare this analysis with target design requirements 

from datetime import datetime
from sacclib.source import analyseAndStoreSourceDocumentationAgainstTargetDesigns
from sacclib.database import getCompletedDocumentedSource, getAnalysedDocumentationVersusTargetDesign

# Get a list of all the files that have had their documentation generated (from source_code_documentation)
# Get a list of all the files that have already had an anlysis done
# Remove the second list from the first, and you can pick from any of these to analyse

#=====================================================

FILESTOPROCESS=2000       # How many files would you like to process this batch?

extToIgnore=['njk']  # Files with extensions to ignore
extToInclude=[] # Files with extensions to specifically ingest
allsourcefiles = getCompletedDocumentedSource()
print(f"There are {len(allsourcefiles)} source files that have had their documentation analysed")

# Get a list of the source files that have already been analysed against Target Designs 
completed = getAnalysedDocumentationVersusTargetDesign()
print(f"{len(completed)} files have already been analysed")

batchfiles = list(set(allsourcefiles) - set(completed))             # Remove the ones already done
print(f"There are at most {len(batchfiles)} left to process.")
todo = batchfiles[0:FILESTOPROCESS]                             # What are you processing this batch?
print(f"The maximum number of files to process in this batch has been set to {FILESTOPROCESS}. This batch will process {len(todo)} files")

verbose=False
llmserver="ollama"
llmserver="azureopenai"

for fname in todo:
    print(f"Time is: {datetime.now()}")
    print(f"Processing {fname}")
    analyseAndStoreSourceDocumentationAgainstTargetDesigns(llmserver=llmserver, sourceFile=fname, verbose=verbose)

