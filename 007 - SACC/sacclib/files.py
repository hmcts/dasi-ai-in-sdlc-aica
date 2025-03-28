import os
import magic
from datetime import datetime

#
#   Mimetype routines
#

# Convert a mimetype string to it's components
def mimetypeToDict(mimetype):
    splitvals=mimetype.split('/')
    if (len(splitvals) == 2):
        mtype=splitvals[0]
        mstype=splitvals[1]
    else:
        mtype="unknown"
        mstype="unknown"

    return {
        'mimetype': mimetype,
        'type': mtype,
        'subtype': mstype
    }

# Find a mime type from a file (i.e. magic number)
def mimetypeFromFile(fname):
    mimetype = magic.from_file(fname, mime = True)
    return mimetypeToDict(mimetype)

# Get the mimetype type (from type/subtype)
def mimetypeType(mimetype):
    return mimetype['type']

# Get the mimetype subtype (from type/subtype)
def mimetypeSubtype(mimetype):
    return mimetype['subtype']

def mimetypeTypeFromFile(fname):
    mimetype = mimetypeFromFile(fname)
    return mimetypeType(mimetype)

def mimetypeSubtypeFromFile(fname):
    mimetype = mimetypeFromFile(fname)
    return mimetypeSubtype(mimetype)

# Return all files from a directory and its subdirectories
# Option to constrain these to specific mimetypes
# Option to only return files with specific extensions
# Option to ignore files with specific extensions
def allFilesInDir(start_path='.', types=None, subtypes=None, verbose=False, extIgnore=[], extInclude=[]):
    if (verbose):
        print(f"types = {types}")
        print(f"subtypes = {subtypes}")
        print(f"Extensions being included = {extInclude}")
        print(f"Extensions being ignored = {extIgnore}")
    if (extIgnore and extInclude):
        print("Error: You cannot use both extIgnore and extInclude")
        return []
    fnames=[]
    for root, dirs, files in os.walk(start_path):
        for file in files:
            fullpath = os.path.join(root, file)
            ext = os.path.splitext(fullpath)[-1].lower()[1:]       # Get the filenames extension
            if (ext in extIgnore):                          # Ignore files with this extension
                if (verbose):
                    print(f"Ignoring file {file} as it has extension '{ext}'")
                continue
            if (extInclude and ext not in extInclude):      # File specifically does not have desired extension
                if (verbose):
                    print(f"Ignoring file {file} as it has does not have one of the following extensions '{extInclude}'")
                continue

            if (types or subtypes):
                if (types):
                    if (mimetypeTypeFromFile(fullpath) in types):
                        fnames.append(fullpath)
                if (subtypes):
                    if (mimetypeSubtypeFromFile(fullpath) in subtypes):
                        fnames.append(fullpath)
            else:
                fnames.append(fullpath)
    # dedup list of files
    fnameset = set(fnames)
    fnames = list(fnameset)
    return fnames

# Determine whether a file exists
def fileExists(file):
    return os.path.isfile(file)
#
#   Count the number of lines in a file.  Allow us to choose to prioritise processing small files
#
def linesInFile(fname):
    size=0
    with open(fname) as f:
        size=len([0 for _ in f])
    return size

# Return a file's last modified time
def mtime(fname):
   return f"{datetime.fromtimestamp(os.stat(fname).st_ctime)}"

def loadTextFile(fname=None):
    f = open(fname)
    content = f.read()
    f.close()
    return content

#
#   Find all relevant files contained in the source code repositories 
#
def getSourceFilesFromRepos(repodir, extInclude, extIgnore):
    # To focus on just the source files for analysis, we will only ingest files under ./src directory in each repo
    subfolders = [ f"{f.path}/src" for f in os.scandir(repodir) if f.is_dir() ]      # Get the repo names and append /src

    # Define the mimetype of files we want to ingest
    # We will only be ingesting text files
    validtypes=['text']
    validsubtypes=['javascript', 'html', 'yml', 'json', 'x-sh', 'xml', 'plain', 'xhtml+xml']

    allfiles=[]
    for subfolder in subfolders:        # For each repo, 
        allfiles += allFilesInDir(subfolder, types=validtypes, subtypes=validsubtypes, extInclude=extInclude, extIgnore=extIgnore)     # Add all valid sub-files

    return allfiles


def saveTextToFile(text, fname):
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(text)