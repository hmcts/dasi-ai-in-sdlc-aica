# For all files that have been analysed to generate documentation, compare this analysis with target design requirements 

from datetime import datetime
from sacclib.source import analyseAndStoreSourceCodeAgainstTargetDesigns
from sacclib.database import getAnalysedSourceCodeVersusTargetDesign
from sacclib.utils import loadConfig
from sacclib.files import getSourceFilesFromRepos

# Get a list of all the files that have had their documentation generated (from source_code_documentation)
# Get a list of all the files that have already had an anlysis done
# Remove the second list from the first, and you can pick from any of these to analyse

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

FILESTOPROCESS=800  # How many files would you like to process this batch?

extToIgnore=['njk']  # Files with extensions to ignore
extToInclude=[] # Files with extensions to specifically ingest
allsourcefiles= getSourceFilesFromRepos(repodir=REPODIR, extIgnore=extToIgnore, extInclude=extToInclude)      # All the files in the source directory
print(f"There are {len(allsourcefiles)} files of interest in the repository")

# Get a list of the source files that have already been analysed against Target Designs 
completed = getAnalysedSourceCodeVersusTargetDesign()
print(f"{len(completed)} files have already been analysed")

batchfiles = list(set(allsourcefiles) - set(completed))             # Remove the ones already done
print(f"There are at most {len(batchfiles)} left to process.")
todo = batchfiles[0:FILESTOPROCESS]                             # What are you processing this batch?
print(f"The maximum number of files to process in this batch has been set to {FILESTOPROCESS}. This batch will process {len(todo)} files")

verbose=False
llmserver="ollama"
llmserver="openai"
llmserver="azureopenai"

for fname in todo:
    print(f"Time is: {datetime.now()}")
    print(f"Processing {fname}")
    analyseAndStoreSourceCodeAgainstTargetDesigns(llmserver=llmserver, sourceFile=fname, verbose=verbose)

