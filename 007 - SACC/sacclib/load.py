import os
import re
from langchain_community.document_loaders import TextLoader, BSHTMLLoader, UnstructuredMarkdownLoader, UnstructuredWordDocumentLoader
from langchain_core.documents import Document
from pdfminer.high_level import extract_text
from pypdf import PdfReader

# Remove blank spaces/excessive newlines etc.
def cleanText(string, omitStrings, omitWords):
    for o in omitStrings:
        string = re.sub(f"({o})", "", string)

    for o in omitWords:
        string = re.sub(f"(\b{o}\b)", "", string)
    
    string = re.sub(f"- ", "", string)          # Re-attach hyphenated words
    string = re.sub("(\n)", " ", string)
        
    return string

# Trying an alternative text extractor from pypdf
def pyPDFExtractText(fname=None):
    reader = PdfReader(fname)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def loadDocument(fname, metadata={}, verbose=False):

    if (verbose):
        print(f"File Name = {fname}")

    if (os.path.isfile(fname) == False):
        print(f"File {fname} does not exist")
        return None

    # basefname = os.path.splitext(fname)[0]
    ext = os.path.splitext(fname)[1].lower()
#    fullpath=os.path.join(inputdirectory, fname)

    base_metadata={"source": fname}
    base_metadata.update(metadata)

#    print(f"New Metadata = {base_metadata}")
    docs = [Document(page_content='', metadata=base_metadata)]

    match ext:
        case '.pdf':
            # if (docContents == "journal"):
            #     text = markerPDFExtractText(f"{inputdirectory}/{fname}")
            # else:
            text = extract_text(f"{fname}")
            docs =  [Document(page_content=text, metadata={"source": fname})]
        case '.docx':
            # loader = Docx2txtLoader(f"{fname}")
            loader = UnstructuredWordDocumentLoader(fname, mode="single")
            docs = loader.load()
        case '.txt':
            loader = TextLoader(f"{fname}", encoding = 'UTF-8')
            docs = loader.load()
        case '.md':
            loader = UnstructuredMarkdownLoader(f"{fname}")
            docs = loader.load()
        case '.html':
            loader = BSHTMLLoader(f"{fname}")
            docs = loader.load()
        case _:
            print(f"Unknown document extension {ext}")

    for d in docs:
        d.page_content = cleanText(d.page_content, omitStrings=['•'], omitWords=[])

    return docs

def loadText(fname, verbose=False):
    docs = loadDocument(fname=fname, verbose=verbose)
    if docs is None:
        return None

    text=""
    for d in docs:
        text = f"{text} {d.page_content}"
   
    if (verbose):
        tokens = 1
        print(f"Document contains {len(text)} characters")
        print(f"Roughly {tokens} tokens")
    return text


#
# Load a file (i.e. source)
# Provide option to include the Filename at the end of the file
# Provide option to include source line numbers at the beginning of each line to help LLM situate content
#
def loadFile(fname, includeFNAME=False, includeLineNumbers=False):
    # file = open(fname, "r")     # Open the file in read mode
    
    with open(fname, encoding='utf8') as f:
        lines = f.readlines()
    if (includeLineNumbers):
        lineNum=1
        newlines=[]
        for line in lines:
            newline = f"{lineNum:05d}   {line}"
            lineNum += 1
            newlines.append(newline)
        lines = newlines
    content = ''.join(lines)

    if (includeFNAME):
        basename = os.path.basename(fname)
        content = f"{content}\n\nFilename: {basename}"
    
    return content


