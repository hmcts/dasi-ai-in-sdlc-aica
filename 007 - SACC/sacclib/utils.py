import os
from Levenshtein import ratio
import json
from os.path import exists
from dotenv import load_dotenv, dotenv_values
from dateutil.parser import parse
import yaml
from sacclib.files import fileExists

# Pretty print a JSON payload
def printJSON(jsonDICT):            # Pretty print a JSON structure
    print(json.dumps(jsonDICT, indent=4, default=str))

def toISODate(str):
    dt = parse(str)
    return dt.strftime('%Y%m%d')

def emptyIfNone(s):
    return s if (s) else ""

# Code is almost guaranteed to include curly brackets. 
# Langchain prompt templates confuse single curly brackets for variables. Replace them with doubles \
def escapeCurlies(str):
    str = str.replace("{", "{{")
    str = str.replace("}", "}}")
    return str

def escapeTripleQuotes(str):
    str = str.replace('"""', '\\"\\"\\"')
    str = str.replace("}", "}}")
    return str

#
#   Return the .env file as a dictionary
#   config = getvars()
#   for key in config:
#    print(f"{key} = {config[key]}")
#
def getvars(fname=None, verbose=False, ignore=True):
    if (fname is None):
        fname = '.env'
    if (verbose):
        print(f"Getting Environment variables from file {fname}")

    if  (exists(fname)== False):
        if (ignore):
            print(f"Warning... file containing environment variables {fname}, does not exist")
        else:
            print(f"Error... file containing environment variables {fname}, does not exist")
        return None

    try:
        config = dotenv_values(fname)
    except:
        print(f"Error getting environment variables from {fname}")
        return None

    return config

#
#   Responses will be returned as a dictionary containing Pydantic objects
#   Show these (or some if needed) to support debugging/transparency
#   A lot of assumptions here that the data is well formed as an array of 'things'
#   There are two ways to access the dictionary:
#       - direct - you pass the entire dictionary of items with a well defined 'things' key
#       - default - The entire response is parsed to extract the dictionary required
def getResponseDictionary(response, firstN=None, direct=False):
    if (direct):
        rDict = json.loads(response)    
    else:   # Parse the dictionary out of the 'response' payload
        text = response['raw'].content
        rDict = json.loads(text)
    
    key=list(rDict.keys())[0]
    contents = rDict.get(key, [])
    count = len(contents)
    if (firstN):
        return {
            'count': count,
            key : rDict[key][0:firstN]
        }
    else:
        return {
            'count': count,
            key : rDict[key]
        }

def printResponseDictionary(response, firstN=None, direct=False):
    payload = getResponseDictionary(response=response, firstN=firstN, direct=direct)
    # print(payload)
    print(f"There are {payload.get('count', -1)} items in this response.")
    if (firstN):
        print(f"Showing at most {firstN} items")
        for i in payload:
            printJSON(i)
    else:
        printJSON(payload)

#
# Configuration file looks like the following example
# 'main':
#     'version': '1.0'
#     'tempDir': 'tmp'
#     'uploadDirectory': 'uploads'
#     'logDirectory': 'logs'
#
# 'database':
#     'databaseType': 'sqlite'
#     'host': 'localhost'
#     'databaseName': 'db.sqlite3'
#     'username': ''
#     'password': ''
#     'port': '5432'

def loadConfig(fname = "config.yml", verbose=False):

    if (fileExists(fname) == False):
        print(f"Error: {fname} is not a valid configuration file.")
        return None
    
    if (verbose):
        print(f"Loading configuration file {fname}")

    try:
        with open(fname, 'r') as file:
            config = yaml.safe_load(file)
    except Exception as e:
        print(f"Error {e} opening configuration file {fname}]")
        return None

    return config

