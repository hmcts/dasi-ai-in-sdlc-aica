# Show a random file and its generator documentation

from sacclib.database import getCompletedDocumentedSource, getSourceDocumentation
from sacclib.files import loadTextFile
import random

# Get a list of the source files that have already been analysed against Target Designs 
print("Getting a random file to show..")
completed = getCompletedDocumentedSource()
print(f"{len(completed)} files are available")
filecount=len(completed)
fname=completed[random.randrange(filecount)]

print(f"File: {fname}")
print("Source Code Follows:")
print("========================================")
content = loadTextFile(fname=fname)
print(content)
print("\nDocumentation Follows:")
print("========================================")
documentation=getSourceDocumentation(fname)
print(f"{documentation}")





