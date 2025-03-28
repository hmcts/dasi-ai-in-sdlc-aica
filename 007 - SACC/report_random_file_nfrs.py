# Show a random file and its nonfunctional requirements

from sacclib.database import getCompletedNonFunctionalRequirementsSource, getSourceNFRs
from sacclib.files import loadTextFile
import random

# Get a list of the source files that have already been analysed against Target Designs 
print("Getting a random file to show..")
completed = getCompletedNonFunctionalRequirementsSource()
print(f"{len(completed)} files are available")
filecount=len(completed)
fname=completed[random.randrange(filecount)]

print(f"File: {fname}")
print("Source Code Follows:")
print("========================================")
content = loadTextFile(fname=fname)
print(content)
print("\nTechnology Follows:")
print("========================================")
techstacks=getSourceNFRs(fname)
print(f"{techstacks}")





