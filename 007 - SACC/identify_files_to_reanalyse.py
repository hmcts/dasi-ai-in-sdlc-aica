#identify files that have changed and need to be re-validated
import os
from datetime import datetime
import time
from sacclib.files import mtime, getSourceFilesFromRepos
from sacclib.database import DBConnect, DBDisconnect
from sacclib.utils import loadConfig

#
# Example of how to determine whether a file needs to be reanalysed
#
# Add additional analysistypes in here as needed 

def RedoAalysis(analysisType=None, filename=None, verbose=False):

    db = DBConnect()
    sql=None
    match analysisType:
        case 'non_functional_requirement_analysis':        # From the non_functional_requirement_analysis table
            sql = f"""
                    select max(execution_time)
                    from non_functional_requirement_analysis
                    where source_document_fullpath = '{filename}'
            """
        case 'functional_attributes_source':        # From the functional_attributes_source table
            sql = f"""
                    select max(execution_time)
                    from functional_attributes_source
                    where source_document_fullpath = '{filename}'
            """
        case _:
            print(f"Error: Unknown AnalysisType {analysisType}")
            return None
    
    modifiedTime = mtime(filename) # return actual modified time of the file on disk
    analysisTime = None # Analysis Time
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:  # Should be a single row 
                analysisTime=f"{r[0]}"
        except Exception as error: 
            print(f"RedoAalysis - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)

    if (analysisTime is None or analysisTime == "None"):    # Silly bug with Postgres assigning no return to a 'None' string 
        return True # If there is no value in the database, then it needs to be rerun
    
    atimestamp = time.strptime(analysisTime, '%Y-%m-%d %H:%M:%S.%f')
    mtimestamp = time.strptime(modifiedTime, '%Y-%m-%d %H:%M:%S.%f')

    return (mtimestamp > atimestamp)

# Identify those files that need to be re=analysed
# Get a list of all files in the repo, and then compare the analysis time with the actual mtime on disk
def identityFilestoReanalyse(sourcedir=None, runtype=None, extToIgnore=[], extToInclude=[], verbose=False):
    print(f"Identifying all files in the source repository: {sourcedir} ")
    allsourcefiles= getSourceFilesFromRepos(repodir=sourcedir, extIgnore=extToIgnore, extInclude=extToInclude)
    print(f"Found {len(allsourcefiles)} files...")
    print(f"Determining which have been updated...")
    redolist=[]
    for fname in allsourcefiles:
        redo = RedoAalysis(filename=fname, analysisType=runtype)
        if (redo):
            redolist.append(fname)
    return redolist


config=loadConfig(verbose=False)
dirs = config.get('directories', None)
if (dirs is None):
    print("Error: You need to set your directories in your config file")
    exit(1)
REPODIR=dirs.get('sourcefiles', None)
if (REPODIR is None):
    print("Error: You need to set your source file in your config file")
    exit(1)

# REPODIR='./repos'       # Where are the source files?
analysisType='non_functional_requirement_analysis'
analysisType='functional_attributes_source'

redo = identityFilestoReanalyse(sourcedir=REPODIR, runtype=analysisType, extToIgnore=[], extToInclude=[])
print("You need to reanalyse the following files:")
for f in redo:
    print(f"{f}")


