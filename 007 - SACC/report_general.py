# Provide a brief report on the content within the database

from sacclib.database import getCountofDBItem, getLLMStats
from sacclib.utils import emptyIfNone
import datetime

#
#   Extract concrete statistics from the database around data ingested, and LLM usage
#
def getDatabaseStatistics(startTime=None, endTime=None):
    SQLTECHSTACKSource = "select count(distinct(source_document_fullpath)) FROM functional_attributes_source;"
    SQLNFRSourceFiles = "select count(distinct(source_document_fullpath)) FROM non_functional_requirements_source;"
    SQLAPs = "select count(*) FROM architecture_principles_design;"
    SQLNFRDesign = "select count(distinct(non_functional_requirement)) FROM non_functional_requirements_design;"
    SQLADs = "select count(distinct(architecture_design_decision)) FROM architecture_design_decisions;"
    SOURCEDOCUMENTATION = "select count(*) FROM source_code_documentation;"
    TECHNOLOGYPRICIPLES = "select count(*) FROM technology_strategy_principles_standards;"
    DOCUMENTATIONVERSUSTD = "select count(distinct(source_document_fullpath)) FROM target_design_versus_source_documentation_analysis;"
    SOURCECODEVERSUSTD = "select count(distinct(source_document_fullpath)) FROM target_design_versus_source_code_analysis;"

    SQLTECHSTACKSourceCount = getCountofDBItem(SQLTECHSTACKSource)
    SQLNFRSourceFilesCount = getCountofDBItem(SQLNFRSourceFiles)
    SQLAPsCount = getCountofDBItem(SQLAPs)
    SQLNFRDesignCount = getCountofDBItem(SQLNFRDesign)
    SQLADsCount = getCountofDBItem(SQLADs)
    SOURCEDOCUMENTATIONCount = getCountofDBItem(SOURCEDOCUMENTATION)
    DOCUMENTATIONAnalysedVsTDCount = getCountofDBItem(DOCUMENTATIONVERSUSTD)
    SOURCECODEAnalysedVsTDCount = getCountofDBItem(SOURCECODEVERSUSTD)
    TECHPRINCIPLESCount = getCountofDBItem(TECHNOLOGYPRICIPLES)
    LLMStats = getLLMStats(startTime=startTime, endTime=endTime)

    print("\n\n")
    print(f"Report run at: {datetime.datetime.now()}") 
    print(f"=============================================================")
    print(f"Total of source files analysed for functional attributes: {SQLTECHSTACKSourceCount}")
    print(f"Total of source files analysed for nonfunctional requirements: {SQLNFRSourceFilesCount}")
    print(f"Total of architectural principles found: {SQLAPsCount}")
    print(f"Total of technology principles found: {TECHPRINCIPLESCount}")
    print(f"Total of nonfunctional requirements from design documents: {SQLNFRDesignCount}")
    print(f"Total of architectural decisions from design documents: {SQLADsCount}")
    print(f"Total of source files with extracted documentation: {SOURCEDOCUMENTATIONCount}")
    print(f"Total of source file documentation analysed against target designs: {DOCUMENTATIONAnalysedVsTDCount}")
    print(f"Total of source code files analysed against target designs: {SOURCECODEAnalysedVsTDCount}")

    print()
    title="LLM Statistics"
    print(f"{title:^91}")
    print(f"+-{'-'*20} + {'-'*25} + {'-'*10} + {'-'*10} + {'-'*10}-+")
    print(f"+ {'Server':^20} + {'Model':^25} + {'I/P Tokens':^10} + {'O/P Tokens':^10} + {'Total':^10} +")
    print(f"+-{'-'*20} + {'-'*25} + {'-'*10} + {'-'*10} + {'-'*10}-+")
    for s in LLMStats:
        llmserver = emptyIfNone(s.get('llmserver', 'Unknown'))
        model = emptyIfNone(s.get('model', 'Unknown'))
        inputtokens = emptyIfNone(s.get('totalinputtokens', ''))
        outputtokens = emptyIfNone(s.get('totaloutputtokens', ''))
        totaltokens = emptyIfNone(s.get('totaltokens', ''))
        print(f"| {llmserver:20} | {model:25} | {inputtokens:10} | {outputtokens:10} | {totaltokens:10} |")



# Use ISO format
ENDTIME=""      # STARTTIME="2025-03-11 12:30" would allow you to limit from a start-time
STARTTIME=""    # ENDTIME="2025-03-09 12:23" would allow you to constrain to an end-time

getDatabaseStatistics(startTime=STARTTIME, endTime=ENDTIME)



