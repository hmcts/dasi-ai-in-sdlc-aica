--
-- Need to confirm that this still matches the database backup values
--

DROP DATABASE IF EXISTS reqsdb;
CREATE DATABASE reqsdb;
\c reqsdb;


drop TABLE if EXISTS llm_execution_log;

--
--  Provide a logging mechanism for LLM calls
--
CREATE TABLE llm_execution_log (
    ID SERIAL PRIMARY KEY,
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    label VARCHAR(512),         -- An optional label to describe this LLM Call
    llm_server VARCHAR(32),    -- Server type (e.g. ollama, openai, groq)
    model VARCHAR(64),  -- gpt-3, qwen2.5:7b etc.
    prompt VARCHAR(150000), -- the prompt used to generate the response
    content VARCHAR(150000),  -- the response content
    input_tokens integer,
    output_tokens integer,
    total_tokens integer,
    time_load float, -- seconds to load the model
    time_total float   -- seconds to generate the response
);

--
--  Design Decisions
--
DROP TABLE IF EXISTS architecture_design_decisions; 

CREATE TABLE architecture_design_decisions (
    adid VARCHAR(32) PRIMARY KEY,
    architecture_design_decision VARCHAR(256),
    architecture_design_decision_date DATE,
    architecture_design_who_decided VARCHAR(256),
    architecture_design_decision_evidence VARCHAR (1024),
    architecture_design_decision_excerpt VARCHAR (1024),
    source_document_fullpath VARCHAR(512),
    document_type VARCHAR(128)
);

CREATE INDEX IF NOT EXISTS design_decisions_idx_sourcedoc ON architecture_design_decisions (source_document_fullpath);
--
--  Generated Documentation
--
DROP TABLE IF EXISTS source_code_documentation; 

CREATE TABLE source_code_documentation (
    ID SERIAL PRIMARY KEY, 
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    overall_aim VARCHAR(4096),
    successful_outcome VARCHAR(4096),
    failed_outcome VARCHAR(4096),
    functionality VARCHAR(4096),
    target_design_evidence VARCHAR(4096),
    source_document_fullpath VARCHAR(512),
    document_type VARCHAR(128)
);


--
-- Functional Attributes from Source
--

DROP TABLE IF EXISTS functional_attributes_source; 

CREATE TABLE functional_attributes_source (
    ID SERIAL PRIMARY KEY,
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    technology_name VARCHAR(256),
    technology_type VARCHAR(256),
    functionality VARCHAR(512),
    functional_attributes_evidence VARCHAR(512),
    functional_attributes_outcome VARCHAR(512),
    functional_attributes_excerpt VARCHAR(2048),
    source_document_fullpath VARCHAR(512),
    line_number VARCHAR(64),
    document_type VARCHAR(128)
);

CREATE INDEX IF NOT EXISTS functional_attributes_idx_fullpath ON functional_attributes_source (source_document_fullpath);


--
--  Non-Functional Requirements extracted from design documents
--
DROP TABLE IF EXISTS non_functional_requirements_design; 

CREATE TABLE non_functional_requirements_design (
    ID SERIAL PRIMARY KEY, 
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    non_functional_requirement_reference VARCHAR(64),
    non_functional_requirement VARCHAR(64),
    non_functional_requirement_description VARCHAR(512),
    non_functional_requirement_priority VARCHAR(64),
    non_functional_requirement_evidence VARCHAR(512),
    non_functional_requirement_excerpt VARCHAR(1024),
    source_document_fullpath VARCHAR(512),
    document_type VARCHAR(128)
);


--
--  Non-Functional Requirements extracted from source
--
DROP TABLE IF EXISTS non_functional_requirements_source; 

CREATE TABLE non_functional_requirements_source (
    ID SERIAL PRIMARY KEY, 
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    technology_name VARCHAR(256),
    technology_type VARCHAR(256),
    non_functional_requirement VARCHAR(512),
    non_functional_requirement_evidence VARCHAR(512),
    non_functional_requirement_outcome VARCHAR(512),
    source_document_fullpath VARCHAR(512),
    line_number VARCHAR(64),
    document_type VARCHAR(128)
);

CREATE INDEX IF NOT EXISTS non_functional_requirements_source_idx_fullpath ON non_functional_requirements_source (source_document_fullpath);

--
DROP TABLE IF EXISTS technology_strategy_principles_standards; 

CREATE TABLE technology_strategy_principles_standards (
    ID SERIAL PRIMARY KEY, 
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    principle_name VARCHAR(1024),
    principle_description VARCHAR(4096),
    source_document_fullpath VARCHAR(512),
    document_type VARCHAR(128)
);


--
-- Architecture Principles from Design
--

DROP TABLE IF EXISTS architecture_principles_design; 

CREATE TABLE architecture_principles_design (
    ID SERIAL PRIMARY KEY,
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    architecture_principle_name VARCHAR(512), 
    architecture_principle_description VARCHAR(512),
    architecture_principle_evidence VARCHAR(512),
    architecture_principle_excerpt VARCHAR(512),
    source_document_fullpath VARCHAR(512),
    document_type VARCHAR(128)            
);

DROP TABLE IF EXISTS target_design_section; 

CREATE TABLE target_design_section (
    ID SERIAL PRIMARY KEY,
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    target_design_section_name VARCHAR(128),
    target_design_section_number VARCHAR(128),
    target_design_section_description VARCHAR(2048),
    source_document_fullpath VARCHAR(512),
    document_type VARCHAR(128)            
);

DROP TABLE IF EXISTS target_design_subsection; 

CREATE TABLE target_design_subsection (
    ID SERIAL PRIMARY KEY,
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- target_design_section_name VARCHAR(128),
    target_design_section_number VARCHAR(128),
    target_design_subsection_name VARCHAR(128),
    target_design_subsection_number VARCHAR(128),
    target_design_subsection_description VARCHAR(4096),
    target_design_subsection_evidence VARCHAR(4096),
    target_design_subsection_excerpt VARCHAR(4096),
    source_document_fullpath VARCHAR(512),
    document_type VARCHAR(128)            
);

DROP TABLE IF EXISTS target_design_requirements; 

CREATE TABLE target_design_requirements (
    ID SERIAL PRIMARY KEY,
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    target_design_section_name VARCHAR(256),
    target_design_section_description VARCHAR(4096),
    target_design_section_mandatory VARCHAR(4096),
    target_design_section_prohibitions VARCHAR(4096),
    target_design_section_proof VARCHAR(4096),
    source_document_fullpath VARCHAR(512),
    document_type VARCHAR(128)            
);

--
--  Results of comparitive analyses
--
DROP TABLE IF EXISTS non_functional_requirement_analysis; 

CREATE TABLE non_functional_requirement_analysis (
    ID SERIAL PRIMARY KEY,
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    non_functional_requirement VARCHAR(64),
    non_functional_requirement_description VARCHAR(4096),
    non_functional_requirement_source_analysis VARCHAR(2048),
    non_functional_technology_match VARCHAR(512),
    non_functional_technology_rating INTEGER,
    non_functional_requirement_match VARCHAR(512),
    non_functional_requirement_rating INTEGER,
    non_functional_outcome_match VARCHAR(512),
    non_functional_outcome_rating INTEGER,
    non_functional_analysis_comprehensiveness VARCHAR(512),
    non_functional_analysis_comprehensiveness_rating INTEGER,
    source_document_fullpath VARCHAR(512)
);

CREATE INDEX IF NOT EXISTS non_functional_requirement_analysis_idx_fullpath ON non_functional_requirement_analysis (source_document_fullpath);
CREATE INDEX IF NOT EXISTS non_functional_requirement_analysis_idx_nfr ON non_functional_requirement_analysis (non_functional_requirement);
CREATE INDEX IF NOT EXISTS non_functional_requirement_analysis_idx_techrating ON non_functional_requirement_analysis (non_functional_technology_rating);
CREATE INDEX IF NOT EXISTS non_functional_requirement_analysis_idx_reqrating ON non_functional_requirement_analysis (non_functional_requirement_rating);
CREATE INDEX IF NOT EXISTS non_functional_requirement_analysis_idx_outcomerating ON non_functional_requirement_analysis (non_functional_outcome_rating);
CREATE INDEX IF NOT EXISTS non_functional_requirement_analysis_idx_comprating ON non_functional_requirement_analysis (non_functional_analysis_comprehensiveness_rating);



--
--  Results of comparing target designs to source code documentation
--
DROP TABLE IF EXISTS target_design_versus_source_code_analysis; 

CREATE TABLE target_design_versus_source_code_analysis (
    ID SERIAL PRIMARY KEY,
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    target_design_name VARCHAR(1024),
    target_design_summary VARCHAR(16483),
    alignment VARCHAR(16384),
    alignment_rating INTEGER,
    mandatory_match VARCHAR(16384),
    mandatory_rating INTEGER,
    prohibited_match VARCHAR(16384),
    prohibited_rating INTEGER,
    proof_match VARCHAR(16384),
    proof_rating INTEGER,
    source_document_fullpath VARCHAR(1024)
);

--
--  Results of comparing target designs to source code documentation
--
DROP TABLE IF EXISTS target_design_versus_source_documentation_analysis; 

CREATE TABLE target_design_versus_source_documentation_analysis (
    ID SERIAL PRIMARY KEY,
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_documentation VARCHAR(16384),
    target_design_name VARCHAR(1024),
    target_design_summary VARCHAR(16384),
    alignment VARCHAR(16384),
    alignment_rating INTEGER,
    success VARCHAR(16384),
    success_rating INTEGER,
    failure VARCHAR(16384),
    failure_rating INTEGER,
    technology VARCHAR(16384),
    technology_rating INTEGER,
    target_design_match VARCHAR(16384),
    target_design_match_rating INTEGER,
    source_document_fullpath VARCHAR(1024)
);

CREATE INDEX IF NOT EXISTS target_design_versus_source_documentation_analysis_idx_fullpath ON target_design_versus_source_documentation_analysis (source_document_fullpath);
CREATE INDEX IF NOT EXISTS target_design_versus_source_documentation_analysis_idx_target_design_name ON target_design_versus_source_documentation_analysis (target_design_name);







