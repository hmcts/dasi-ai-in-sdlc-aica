#
#   Routines associated with database functionality
#

import psycopg2
from sacclib.llm import getLLMMetrics
from sacclib.utils import loadConfig

config=loadConfig(verbose=False)

# Connect to the database
def DBConnect():

    db = config.get('database', None)
    if (db is None):
        print("Error getting database configuration")
        return None
    dbname=db.get('databasename', None)
    user=db.get('username', None)
    password=db.get('password', "")
    port=db.get('port', "")
    host=db.get('host', "")
    conn=None
    try: 
        conn = psycopg2.connect(database=dbname, user=user, host=host, port=port)
    except (Exception, psycopg2.DatabaseError) as error: 
        print(error)
    return conn

# Disconnect from the database
def DBDisconnect(conn):
    conn.close()

#
#   Insert a design decision
#
def insertArchitectureDesignDecision(ADID, decision, design_date, who, evidence, excerpt, sourcedoc, doctype, verbose=False):

    sql = """
            INSERT INTO architecture_design_decisions(ADID, architecture_design_decision, architecture_design_decision_date, architecture_design_who_decided, architecture_design_decision_evidence, architecture_design_decision_excerpt, source_document_fullpath, document_type) 
            VALUES(%s, %s, date(%s), %s, %s, %s, %s, %s)  RETURNING ADID;
            """
    if (verbose):
        print("Inserting an Architectural Design Decision")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (ADID, decision, design_date, who, evidence, excerpt, sourcedoc, doctype))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print("Inserted a Design Decision")
                else:
                    print("Unable to insert an Architectural Design Decision")

            db.commit() 
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertArchitectureDesignDecision - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status

#
#   Insert an Architecture Principle
#
def insertArchitecturePrinciple(principle, description, evidence, excerpt, sourcedoc, doctype, verbose=False):

    sql = """
            INSERT INTO architecture_principles_design(architecture_principle_name, architecture_principle_description, architecture_principle_evidence, architecture_principle_excerpt, source_document_fullpath, document_type) 
            VALUES(%s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting an Architectecture Principle")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (principle, description, evidence, excerpt, sourcedoc, doctype,))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print("Inserted an Architecture Principle")
                else:
                    print("Unable to insert row")

            db.commit() 
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertArchitecturePrinciple - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status

def insertTargetDesignRequirement(name, description, mandatory, prohibitions, proof, sourcedoc, doctype, verbose=False):

    sql = """
            INSERT INTO target_design_requirements(target_design_section_name, target_design_section_description, target_design_section_mandatory, target_design_section_prohibitions, target_design_section_proof, source_document_fullpath, document_type) 
            VALUES(%s, %s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting a Target Design Requirement")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (name, description, mandatory, prohibitions, proof, sourcedoc, doctype,))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print("Inserted a Target Design Requirement")
                else:
                    print("Unable to insert row")

            db.commit() 
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertTargetDesignRequirement - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status

# 
#   Insert a Functional Attribute from source
#
def insertFunctionalAttributeFromSource(technologyName, technologyType, functionality, evidence, outcome, excerpt, sourcedoc, lineNum, doctype, verbose=False):

    sql = """
            INSERT INTO functional_attributes_source(technology_name, technology_type, functionality, functional_attributes_evidence, functional_attributes_outcome, functional_attributes_excerpt, source_document_fullpath, line_number, document_type) 
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting a functional attribute from source")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (technologyName, technologyType, functionality, evidence, outcome, excerpt, sourcedoc, lineNum, doctype))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print("Inserted a functional attribute (from source)")
                else:
                    print("Unable to insert a functional attribute (from source)")
            db.commit()
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertFunctionalAttributeFromSource - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status

#
#   Get a list of all source files that have functional attributes analysed
#   This allows us to avoid re-running the analysis on files we've already done
#   We effective have a 'restart' mechanism
#
def getCompletedFunctionalAttributesSource(verbose=False):
    sql = "select distinct (source_document_fullpath) FROM functional_attributes_source;"

    db = DBConnect()
    done=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                done.append(r[0])
        except Exception as error: 
            print(f"getCompletedFunctionalAttributesSource - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return done

# Get a list of files that have been ingested with an NFR analysis
def getCompletedNonFunctionalRequirementsSource(verbose=False):
    sql = "select distinct (source_document_fullpath) FROM non_functional_requirements_source;"

    db = DBConnect()
    done=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                done.append(r[0])
        except Exception as error: 
            print(f"getCompletedNonFunctionalRequirementsSource - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return done

# Get a list of files that have been ingested to summarise their documentation
def getCompletedDocumentedSource(verbose=False):
    sql = "select distinct (source_document_fullpath) FROM source_code_documentation;"

    db = DBConnect()
    done=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                done.append(r[0])
        except Exception as error: 
            print(f"getCompletedSourceDocumented - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return done

# Get a list of the sections from the Target Design 
def getTDSections():

    db = DBConnect()
    sql = f"""
            select	target_design_section_name
            from	target_design_section;
    """

    sections=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                sections.append(f"{r[0]}")
        except Exception as error: 
            print(f"getSourceNFRDescription - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return sections

# Get a list of the sections from the Target Design 
def getTDRequirements(TDName):

    db = DBConnect()
    sql = f"""
            select	target_design_section_description, target_design_section_mandatory, target_design_section_prohibitions, target_design_section_proof 
            from	target_design_requirements
            where   target_design_section_name ILIKE '%{TDName}%';
    """

    TDRequirements={}
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                TDRequirements['description'] = f"{r[0]}"
                TDRequirements['mandatory'] = f"{r[1]}"
                TDRequirements['prohibitions'] = f"{r[2]}"
                TDRequirements['proof'] = f"{r[3]}"
        except Exception as error: 
            print(f"getTDRequirements - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return TDRequirements

# Pull in the rudimentary documentation automatically generated by analysing the file
def getSourceDocumentation(sourceFile=None, scope=[]):

    if (sourceFile is None):
        print("You must provide a source code file Name...")
        return None

    db = DBConnect()
    sql = f"""
        select	overall_aim, successful_outcome, failed_outcome, functionality, target_design_evidence
        from	source_code_documentation
        where	source_document_fullpath = '{sourceFile}'
    """

    overall_aim=""
    successful_outcome=""
    failed_outcome=""
    functionality=""
    target_design_evidence=""
    sourceFileDocumentation=""
    if (len(scope) == 0):   # If no specific scope has been provided, then return everything
        scope = ['aim', 'success', 'failure', 'functionality', 'td_evidence']
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:      # There should only be one, but nothing to change
                overall_aim = f"{r[0]}" 
                successful_outcome = f"{r[1]}" 
                failed_outcome = f"{r[2]}" 
                functionality = f"{r[3]}"
                target_design_evidence = f"{r[4]}"

                sourceFileDocumentation += f"The source code has some rudimentary documentation as follows:\n\n"
                if ('aim' in scope):
                    sourceFileDocumentation += f"The overall aim of the source code is as follows:\n{overall_aim}:\n\n"
                if ('success' in scope):
                    sourceFileDocumentation += f"A successful outcome of using the source code would be as follows:\n{successful_outcome}:\n\n"
                if ('failure' in scope):
                    sourceFileDocumentation += f"A failed outcome from using the source code would be defined as follows:\n{failed_outcome}:\n\n"
                if ('functionality' in scope):
                    sourceFileDocumentation += f"Its core functionality is as follows:\n{functionality}:\n\n"
                if ('td_evidence' in scope):
                    sourceFileDocumentation += f"Areas aligning to the target design include:\n{target_design_evidence}:\n\n"

        except Exception as error: 
            print(f"getSourceDocumentation - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)

    return sourceFileDocumentation

# Pull in the functional attributes generated by analysing the file
def getSourceFunctionalAttributes(sourceFile=None):

    if (sourceFile is None):
        print("You must provide a source code file Name...")
        return None

    db = DBConnect()
    sql = f"""
        select	technology_name, technology_type, functionality, functional_attributes_evidence, 
                functional_attributes_outcome, line_number
        from	functional_attributes_source
        where	source_document_fullpath = '{sourceFile}'
    """
    sourcetechstacks=f"The following is a summary of the technology contained within the file {sourceFile}\n"
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:      # There should only be one, but nothing to change
                tech_name = f"{r[0]}" 
                tech_type = f"{r[1]}" 
                functionality = f"{r[2]}" 
                evidence = f"{r[3]}"
                outcome = f"{r[4]}"
                line_num = f"{r[5]}"

                sourcetechstacks += f"Technology: {tech_name}    Type: {tech_type}\n"
                sourcetechstacks += f"Line Number: {line_num}\n"
                sourcetechstacks += f"Functionality: {functionality}\n"
                sourcetechstacks += f"Evidence: {evidence}\n"
                sourcetechstacks += f"Expected Outcome: {outcome}\n\n"

        except Exception as error: 
            print(f"getSourceFunctionalAttributes - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)

    return sourcetechstacks

# Pull in the functional attributes generated by analysing the file
def getSourceNFRs(sourceFile=None):

    if (sourceFile is None):
        print("You must provide a source code file Name...")
        return None

    db = DBConnect()
    sql = f"""
        select	technology_name, technology_type, non_functional_requirement, non_functional_requirement_evidence, 
                non_functional_requirement_outcome, line_number
        from	non_functional_requirements_source
        where	source_document_fullpath = '{sourceFile}'
    """
    nfrs=f"The following is a summary of the nonfunctional requirements being addressed within the file {sourceFile}\n"
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:      # There should only be one, but nothing to change
                tech_name = f"{r[0]}" 
                tech_type = f"{r[1]}" 
                functionality = f"{r[2]}" 
                evidence = f"{r[3]}"
                outcome = f"{r[4]}"
                line_num = f"{r[5]}"

                nfrs += f"Technology: {tech_name}    Type: {tech_type}\n"
                nfrs += f"Line Number: {line_num}\n"
                nfrs += f"Functionality: {functionality}\n"
                nfrs += f"Evidence: {evidence}\n"
                nfrs += f"Expected Outcome: {outcome}\n\n"

        except Exception as error: 
            print(f"getSourceFunctionalAttributes - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)

    return nfrs

#   Build up the target Design text to use in a prompt
def getTargetDesignContent(target_design_section):

    db = DBConnect()
    sql = f"""
            Select	tds.target_design_section_number, tds.target_design_section_name, tds.target_design_section_description,
			    	tdss.target_design_subsection_number, tdss.target_design_subsection_name, tdss.target_design_subsection_description, tdss.target_design_subsection_evidence
            from    target_design_section tds, target_design_subsection tdss
            where   tds.target_design_section_number = tdss.target_design_section_number and
                    tds.target_design_section_name = '{target_design_section}'
            order by tds.target_design_section_number, tdss.target_design_subsection_number
    """

    targetdesigns = []
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            old_section_number=""
            section = {}
            targetdesigns = []
            for r in rows:
                # print(r)
                section_number = f"{r[0]}"
                section_name = f"{r[1]}"
                section_description = f"{r[2]}"
                subsection_number = f"{r[3]}"
                subsection_name = f"{r[4]}"
                subsubsection_description = f"{r[5]}"
                subsubsection_evidence = f"{r[6]}"
                subsection = { 
                    'subsection_number' : subsection_number,
                    'subsection_name' : subsection_name,
                    'subsection_description'  :  subsubsection_description, 
                    'subsection_evidence'  :  subsubsection_evidence
                }
                # print(f"section number = '{section_number}'")
                # print(f"old section number = '{old_section_number}'")
                if section_number != old_section_number:    # Start a new section
                    # if (section != {}):
                    #     print(f"Adding additional section {section}")
                    #     targetdesigns.append(section)
                    section = { 
                        'section' : { 
                            'section_number' : section_number,
                            'section_name' : section_name,
                            'section_description': section_description,
                            'subsections' : [ subsection ]
                        }
                    }
                    # print(f"Setting section to {section}")
                    old_section_number = section_number
                else:
                    # print(f"Appending {subsection} to section")
                    section['section']['subsections'].append(subsection)
                # print(f"Section now = ")
                # printJSON(section)
            # if (len(targetdesigns) > 0):
                # targetdesigns.append(section)
            targetdesigns.append(section)
        except Exception as error: 
            print(f"getSourceFunctionality - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)

    # We now have a dictionary.  Let's use it creatively to format what should go ito a prompt

    # print("TD = ")
    # printJSON(targetdesigns)
    # print("====")
    targetdesign=""
    for sections in targetdesigns:
        section = sections['section']
        # targetdesign += f"Target Design: {section['section_number']} : {section['section_name']}\n"
        targetdesign += f"Target Design: {section['section_name']}\n"
        targetdesign += f"Target Design Description: {section['section_description']}\n\n"
        targetdesign += f"This target design contains the following subsections:\n\n"
        for subsection in section['subsections']:
            # targetdesign += f"Number: {subsection['subsection_number']}: {subsection['subsection_name']}\n"
            targetdesign += f"Target Design Subsection: {subsection['subsection_name']}\n"
            targetdesign += f"Description: {subsection['subsection_description']}\n"
            targetdesign += f"Evidence: {subsection['subsection_evidence']}\n\n"

    return targetdesign

def getAnalysedSourceCodeVersusTargetDesign(verbose=False):
    sql = "select distinct(source_document_fullpath) FROM target_design_versus_source_code_analysis;"

    db = DBConnect()
    done=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                done.append(r[0])
        except Exception as error: 
            print(f"getAnalysedSourceCodeVersusTargetDesign - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return done

# Get a list of all the files that have had their documentation compared against target design requirements
def getAnalysedDocumentationVersusTargetDesign(verbose=False):
    sql = "select distinct(source_document_fullpath) FROM target_design_versus_source_documentation_analysis;"

    db = DBConnect()
    done=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                done.append(r[0])
        except Exception as error: 
            print(f"getAnalysedDocumentationVersusTargetDesign - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return done

# Get a list of NFR Analyses that have already been done
def getCompletedNFRAnalyses(verbose=False):
    sql = "select distinct (source_document_fullpath) FROM non_functional_requirement_analysis;"

    db = DBConnect()
    done=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                done.append(r[0])
        except Exception as error: 
            print(f"getCompletedNFRAnalyses - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return done

# Get a list of source files that have been ingested
def getNFRFiles(verbose=False):
    sql = "select distinct (source_document_fullpath) FROM non_functional_requirements_source;"

    db = DBConnect()
    done=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                done.append(r[0])
        except Exception as error: 
            print(f"getNFRFiles - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return done

# Insert a single row into the source_code_documentation table
def insertDocumentationFromSource(overallaim, successfuloutcome, failedoutcome, functionality, evidence, sourcedoc, doctype, verbose=False):

    sql = """
            INSERT INTO source_code_documentation(overall_aim, successful_outcome, failed_outcome, functionality, target_design_evidence, source_document_fullpath, document_type) 
            VALUES(%s, %s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting documentation of a source file")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (overallaim, successfuloutcome, failedoutcome, functionality, evidence, sourcedoc, doctype))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print("Inserted docuementation from source code")
                else:
                    print("Unable to insert a functional attribute (from source)")
            db.commit()
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertDocumentationFromSource - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status    

#
#   Insert a Technical Capability from Standards
#
def insertTechnicalCapabilityPrincipleFromStandards(principle, description, sourcedoc, doctype, verbose=False):
    sql = """
            INSERT INTO technology_strategy_principles_standards(principle_name, principle_description, source_document_fullpath, document_type) 
            VALUES(%s, %s, %s, %s )  RETURNING ID;
            """
    if (verbose):
        print("Inserting a technical capability principle (from standards)")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (principle, description, sourcedoc, doctype))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print("Inserted a technical capability principle (from standards)")
                else:
                    print("Unable to insert a technical capability principle (from standards)")
            db.commit()
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertNFRSource - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status    


#
#   Insert a non-functional requirement from source
#
def insertNFRFromSource(technologyName, technologyType, nfr, evidence, outcome, excerpt, sourcedoc, lineNum, doctype, verbose=False):

    sql = """
            INSERT INTO non_functional_requirements_source(technology_name, technology_type, non_functional_requirement, non_functional_requirement_evidence, non_functional_requirement_outcome, source_document_fullpath, line_number, document_type) 
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting a functional attribute from source")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (technologyName, technologyType, nfr, evidence, outcome, sourcedoc, lineNum, doctype))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print("Inserted a functional attribute (from source)")
                else:
                    print("Unable to insert a functional attribute (from source)")
            db.commit()
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertNFRSource - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status    

#
#   Insert a non-functional requirement from a Design Document
#
def insertNFRFromDesign(nfrREF, nfr, description, priority, evidence, excerpt, sourcedoc, doctype, verbose=False):

    sql = """
            INSERT INTO non_functional_requirements_design(
                non_functional_requirement_reference,           
                non_functional_requirement,
                non_functional_requirement_description,
                non_functional_requirement_priority,
                non_functional_requirement_evidence,
                non_functional_requirement_excerpt,
                source_document_fullpath,
                document_type)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting a nonfunctional requirement from design")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (nfrREF, nfr, description, priority, evidence, excerpt, sourcedoc, doctype))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print(f"Inserted a nonfunctional requirement (from design): ID {status}")
                else:
                    print("Unable to insert a nonfunctional requirement (from design)")
            db.commit()
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertNFRFromDesign - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status

#
#   Insert a target design section from a Design Document (LLD)
#
def insertTargetDesignSectionFromLLD(section_name, section_number, section_description, sourcedoc, doctype, verbose=False):

    sql = """
            INSERT INTO target_design_section(
                target_design_section_name,           
                target_design_section_number,
                target_design_section_description,
                source_document_fullpath,
                document_type)
            VALUES(%s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting a target design section (from LLD)")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (section_name, section_number, section_description, sourcedoc, doctype))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print(f"Inserted a target design section (from LLD): ID {status}")
                else:
                    print("Unable to insert a target design section (from LLD)")
            db.commit()
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertTargetDesignSectionFromLLD - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status

def insertTargetDesignSubsectionFromLLD(section_name, section_number, subsection_name, subsection_number, subsection_description, 
                                        subsection_evidence, subsection_excerpt, sourcedoc, doctype, verbose=False):

                # target_design_section_name,
    sql = """
            INSERT INTO target_design_subsection(
                target_design_section_number,
                target_design_subsection_name,
                target_design_subsection_number,
                target_design_subsection_description,
                target_design_subsection_evidence,
                target_design_subsection_excerpt,
                source_document_fullpath,
                document_type)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting a target design subsection (from LLD)")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (section_number, subsection_name, subsection_number, subsection_description, subsection_evidence, 
                              subsection_excerpt,sourcedoc, doctype))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print(f"Inserted a target design subsection (from LLD): ID {status}")
                else:
                    print("Unable to insert a target design subsection (from LLD)")
            db.commit()
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertTargetDesignSubsectionFromLLD - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status

# Insert an analysis between the NFR from a source file and the HLD definitions 
def insertNFRAnalysis(nfr, nfr_description, nfr_source_analysis, tech_match, tech_rating,
                      nfr_match, nfr_rating, outcome_match, outcome_rating, comprehensiveness, comprehensiveness_rating, sourcedoc, verbose=False):

    sql = """
            INSERT INTO non_functional_requirement_analysis(
                non_functional_requirement,
                non_functional_requirement_description,
                non_functional_requirement_source_analysis,
                non_functional_technology_match,
                non_functional_technology_rating,
                non_functional_requirement_match,
                non_functional_requirement_rating,
                non_functional_outcome_match,
                non_functional_outcome_rating,
                non_functional_analysis_comprehensiveness,
                non_functional_analysis_comprehensiveness_rating,
                source_document_fullpath)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting a nonfunctional analysis")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (nfr, nfr_description,  nfr_source_analysis, tech_match, tech_rating,
                      nfr_match, nfr_rating, outcome_match, outcome_rating, comprehensiveness, comprehensiveness_rating, sourcedoc))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print(f"Inserted an NFR analysis: ID {status}")
                else:
                    print("Unable to insert a nonfunctional requirement (from design)")
            db.commit()
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertNFRAnalysis - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status

# Insert an analysis between the source code documentation and Target Designs from the LLD 
def insertDocumentationVersusTargetDesignAnalysis(source_documentation, target_design_name, target_design_summary, alignment, alignment_rating,
                      success, success_rating, failure, failure_rating, technology, technology_rating, target_design_match, target_design_match_rating, sourcedoc, verbose=False):

    sql = """
            INSERT INTO target_design_versus_source_documentation_analysis(
                source_documentation,
                target_design_name,
                target_design_summary,
                alignment,
                alignment_rating,
                success,
                success_rating,
                failure,
                failure_rating,
                technology,
                technology_rating,
                target_design_match,
                target_design_match_rating,
                source_document_fullpath)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting an analysis of Documentation versus Target Design")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (source_documentation, target_design_name,  target_design_summary, alignment, alignment_rating,
                      success, success_rating, failure, failure_rating, technology, technology_rating, target_design_match, target_design_match_rating, sourcedoc))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print(f"Inserted an analysis of Documentation versus Target Design: ID {status}")
                else:
                    print("Unable to insert an analysis of Documentation versus Target Design")
            db.commit()
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertDocumentationVersusTargetDesignAnalysis - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status


# Insert an analysis between the source code documentation and Target Designs from the LLD 
def insertSourceCodeVersusTargetDesignAnalysis(target_design_name, target_design_summary, alignment, alignment_rating,
                      mandatory_match, mandatory_rating, prohibited_match, prohibited_rating, proof_match, proof_rating, sourcedoc, verbose=False):

    sql = """
            INSERT INTO target_design_versus_source_code_analysis(
                target_design_name,
                target_design_summary,
                alignment,
                alignment_rating,
                mandatory_match,
                mandatory_rating,
                prohibited_match,
                prohibited_rating,
                proof_match,
                proof_rating,
                source_document_fullpath)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print("Inserting an analysis of Documentation versus Target Design")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (target_design_name, target_design_summary, alignment, alignment_rating,
                      mandatory_match, mandatory_rating, prohibited_match, prohibited_rating, proof_match, proof_rating, sourcedoc))
            rows = cur.fetchone()
            status = rows[0]
            if (verbose):
                if rows:
                    print(f"Inserted an analysis of Source Code of file '{sourcedoc}' versus Target Design: ID {status}")
                else:
                    print("Unable to insert an analysis of Source Code versus Target Design")
            db.commit()
            DBDisconnect(db)
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"insertSourceCodeVersusTargetDesignAnalysis - Error: {error}") 
        finally: 
            DBDisconnect(db)
    return status

# This must return a single row
# Send a COUNT SQL Statement to provide input into a report
def getCountofDBItem(sql):
    db = DBConnect()
    count=0
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                count = r[0]
        except Exception as error: 
            print(f"getCountofDBItem - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return count
    pass

# Get the LLM Statistics. 
# Shows what has been used grouped by LLM Srver, model etc.
def getLLMStats(startTime=None, endTime=None):
    db = DBConnect()

    SOURCE="llm_execution_log"      # Default is everything
    if (startTime or endTime):      # Otherwise constrain the source data
        WHERE = ""
        if (startTime and endTime):
            print(f"Finding results between '{startTime}' and '{endTime}'")
            WHERE = f"WHERE execution_time between '{startTime}' and '{endTime}'"
        elif (startTime and not endTime):
            print(f"Finding results after '{startTime}'")
            WHERE = f"WHERE execution_time >= '{startTime}'"
        elif (endTime and not startTime):
            print(f"Finding results earlier than '{endTime}'")
            WHERE = f"WHERE execution_time <= '{endTime}'" 
        SOURCE = f"( select * from llm_execution_log {WHERE} ) as subquery"

    sql = f"""
        SELECT	llm_server, model, sum(input_tokens) as total_input_tokens, 
	    		sum(output_tokens) as total_output_tokens, sum(total_tokens) as total_tokens
        from    {SOURCE}
        group by llm_server, model
        order by llm_server
    """

    # print(sql)
    results=[]
    if (db):
        try:
            cursor = db.cursor()
            cursor.execute(sql)
            rows = cursor.fetchall()
            for r in rows:
                line= {
                    'llmserver' : r[0],
                    'model' : r[1],
                    'totalinputtokens' : r[2], 
                    'totaloutputtokens' : r[3], 
                    'totaltokens' : r[4], 
                }
                results.append(line)
        except Exception as error: 
            print(f"getCountofDBItem - Error: {error}") 
        finally:
            db.commit()
            DBDisconnect(db)
    return results

# 
#   Log an LLM interaction to the database
#
def logLLMCall(llmServer, label, model, prompt, content, input_tokens, output_tokens, total_tokens, time_load, time_total, verbose=False):

    sql = """
            INSERT INTO llm_execution_log(llm_server, label, model, prompt, content, input_tokens, output_tokens, total_tokens, time_load, time_total) 
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)  RETURNING ID;
            """
    if (verbose):
        print(f"Logging LLM call: {label}")
    db = DBConnect()
    status=None
    if (db):
        try:
            cur = db.cursor()
            cur.execute(sql, (llmServer, label, model, prompt, content, input_tokens, output_tokens, total_tokens, time_load, time_total,))
            rows = cur.fetchone()
            if (rows):
                id = rows[0]
            if (verbose):
                if rows:
                    print(f"LLM Logging ID = {id}")
                else:
                    print("Unable to add LLM Logging data")
            db.commit() 
            DBDisconnect(db)
            status=id
        except (Exception, psycopg2.DatabaseError) as error: 
            print(f"Error: {error}") 
        finally: 
            if db is not None: 
                DBDisconnect(db)
    return status

#
#   Parse the metrics from an LLM interaction and store these 
#
def parseAndSaveLLMMetrics(llmserver="ollama", label=None, full_response=None, verbose=False):
    
    response = full_response.get('response', None)
    prompt = full_response.get('prompt', "")

    id = None
    if (response):
        raw=response['raw']
        content = raw.content
        metadata = raw.response_metadata
        metrics = getLLMMetrics(LLMServer=llmserver, responseMetadata=metadata, verbose=verbose)
        if (verbose):
            print(metrics)
        model=metrics['model']
        input_tokens=metrics['tokensInput']
        output_tokens=metrics['tokensOutput']
        total_tokens=metrics['tokensTotal']
        time_load=metrics['timeLoad']
        time_total=metrics['timeTotal']

        id = logLLMCall(llmServer=llmserver, label=label, model=model, prompt=prompt, content=content, input_tokens=input_tokens, output_tokens=output_tokens, total_tokens=total_tokens, time_load=time_load, time_total=time_total, verbose=verbose)

    return id



