# Provide a brief report on the content within the database

from sacclib.database import getCountofDBItem, DBConnect, DBDisconnect
from sacclib.utils import emptyIfNone
from sacclib.files import loadTextFile
import sys
import getopt

# List source code files that you should look into further

def getTargetDesignGroupsProhibitConcerns(prohibitLimit=0, proofLimit=0):
    db = DBConnect()

    sql = f"""
        SELECT 	target_design_name, count(target_design_name)
        FROM    target_design_versus_source_code_analysis
        WHERE 	prohibited_rating >= {prohibitLimit} AND 
                proof_rating >= {proofLimit}
        GROUP BY target_design_name
        """

    results=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                line= {
                    'target_design_name' : r[0],
                    'count' : r[1],
                }
                results.append(line)
        except Exception as error: 
            print(f"getTargetDesignGroupsProhibitConcerns - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return results

def getFilesByTargetDesignArea(target_design_name=None, prohibitLimit=0, proofLimit=0):
    db = DBConnect()

    sql = f"""
        SELECT	target_design_name, source_document_fullpath, alignment, alignment_rating, 
				mandatory_match, mandatory_rating, prohibited_match, prohibited_rating, proof_match, proof_rating       
        FROM	target_design_versus_source_code_analysis
        WHERE 	prohibited_rating >= {prohibitLimit} AND 
                proof_rating >= {proofLimit} AND 
                target_design_name = '{target_design_name}'
        """

    results=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                line= {
                    'target_design_name' : r[0],
                    'source_document_fullpath' : r[1],
                    'alignment' : r[2],
                    'alignment_rating' : r[3],
                    'mandatory_match' : r[4],
                    'mandatory_rating' : r[5],
                    'prohibited_match' : r[6],
                    'prohibited_rating' : r[7],
                    'proof_match' : r[8],
                    'proof_rating' : r[9],
                }
                results.append(line)
        except Exception as error: 
            print(f"getTargetDesignGroupsProhibitConcerns - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return results

#
#   Provide a simple dashboard of source code files that may conflict with target designs
#
def dashboard(prohibitLimit=0, proofLimit=0, detail=False, source=False):
    
    results = getTargetDesignGroupsProhibitConcerns(prohibitLimit=prohibitLimit, proofLimit=proofLimit)
    if (len(results) > 0):
        print(f"Files where Prohibited items have a rating >= {prohibitLimit} and a proof rating >= {proofLimit}")
        print(f"Grouped by Target Design area")
        print(f"==============================================================")
        for r in results:
            target_design_name = emptyIfNone(r.get('target_design_name', 'Unknown')) + " :"
            count = emptyIfNone(r.get('count', 0))
            print(f" - {target_design_name:50} {count:4}")
        print(f"==============================================================")
        print()
    else:
        print("There are no files that satisfy your prohibited and proof limits")

    if (detail):        # Do we want more detail?
    # Now loop through each Target Design Area and show files of concern
        for r in results:
            target_design_name = emptyIfNone(r.get('target_design_name', 'Unknown'))
            print(f"Files of concern within target design area '{target_design_name}'")
            print(f"-----------------------------------------------------------------------")
            files = getFilesByTargetDesignArea(target_design_name=target_design_name, prohibitLimit=prohibitLimit, proofLimit=proofLimit)
            for f in files:
                fullpath = emptyIfNone(f.get('source_document_fullpath', ''))
                alignment = emptyIfNone(f.get('alignment', ''))
                alignment_rating = f.get('alignment_rating', 0)
                mandatory_match = emptyIfNone(f.get('mandatory_match', ''))
                mandatory_rating = f.get('mandatory_rating', 0)
                prohibited_match = emptyIfNone(f.get('prohibited_match', ''))
                prohibited_rating = f.get('prohibited_rating', 0)
                proof_match = emptyIfNone(f.get('proof_match', ''))
                proof_rating = f.get('proof_rating', 0)

                print(f"Source Code File: {fullpath}")
                print(f"Mandatory Match (Rating of {mandatory_rating})\n{mandatory_match}")
                print(f"Prohibited Match (Rating of {prohibited_rating})\n{prohibited_match}")
                print(f"Proof Match (Rating of {proof_rating})\n{proof_match}")
                print(f"Target Design alignment (Rating of {alignment_rating})\n{alignment}\n")
                if (source):
                    print("============================================================================")
                    content = loadTextFile(fname=fullpath)
                    print(content)
                    print("============================================================================\n")
                print()

# Default Values
PROHIBIT_LIMIT=3
PROOF_LIMIT=3
SHOWSOURCE=False

args=sys.argv[1:]
detail=False 
try:
   opts, args = getopt.getopt(args,"hp:f:ds",["help", "prohibit=","proof=", "detail", "source"])
except getopt.GetoptError:
   print ('python report_source_files_of_interest.py [-h|--help -p|--prohibit <limit> -f|--proof <limit> [-d|--detail] [-s|--source]')
   sys.exit(2)
 
for opt, arg in opts:
    if opt in ("-h", "--help"):
        print ('python report_source_files_of_interest.py [-h|--help -p|--prohibit <limit> -f|--proof <limit> [-d|--detail] [-s|--source]')
        print ('-h | --help     : This message')
        print ('-p | --prohibit : This lower bound on the prohibit value')
        print ('-f | --proof    : This lower bound on the proof value')
        print ('-d | --detail   : Provided detailed results on the source files that match')
        print ("-s | --source   : Show the file's source if -d/--detail is also provided\n")
        sys.exit()
    if opt in ("-s", "--source"):
        SHOWSOURCE = True
    if opt in ("-p", "--prohibit"):
        PROHIBIT_LIMIT = int(arg)
    if opt in ("-f", "--proof"):
        PROOF_LIMIT = int(arg)
    if opt in ("-d", "--detail"):
      detail=True

SOURCECODEVERSUSTD = "select count(distinct(source_document_fullpath)) FROM target_design_versus_source_code_analysis;"
SOURCECODEAnalysedVsTDCount = getCountofDBItem(SOURCECODEVERSUSTD)
print()
print(f"Total number of source code files analysed against target designs: {SOURCECODEAnalysedVsTDCount}")

print(f"Target Design areas of concern: Prohibit Limit >= {PROHIBIT_LIMIT} and Proof Limit = {PROOF_LIMIT}")
dashboard(prohibitLimit=PROHIBIT_LIMIT, proofLimit=PROOF_LIMIT, detail=detail, source=SHOWSOURCE)



