import re
from langchain_community.utilities.sql_database import SQLDatabase
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.chains import create_sql_query_chain
from langchain_core.runnables import chain
from langchain_core.runnables import RunnablePassthrough
from operator import itemgetter
from langchain_community.tools import QuerySQLDatabaseTool
from sacclib.utils import loadConfig
from sacclib.llm import getLLMServer

validLLMServers=['ollama', 'openai', 'groq', 'azureopenai']

config=loadConfig(verbose=False)


db = config.get('database', None)           #Build up a database URI
if (db is None):
    print("Error getting database configuration")
    exit(1)

dbname=db.get('databasename', None)
user=db.get('username', None)
password=db.get('password', "")
port=db.get('port', "")
host=db.get('host', "")
pg_uri = f"postgresql+psycopg2://{user}@{host}:{port}/{dbname}"

try:    # Connect to the Database
    db = SQLDatabase.from_uri(pg_uri)
except Exception as error: 
        print(f"Error: {error}")
        print(f"Unable to connect to database {dbname} on host {host}:{port} with user {user}")
        exit(1) 

# ==================================================================================

# Create a custom chain to strip out markdown noise
@chain
def stripSQLMarkup(valid_sql):
    pattern_group = r"(```sql|```$|```\\n)"         # In case it's added ```sql markdown anyway
    valid_sql = re.sub(pattern_group, "", valid_sql)
    return  valid_sql

def QueryDatabase(llmserver="ollama", question=None, defaultrowlimit=20, verbose=False):

    SQLTemplate = """
    You are a {dialect} expert.

    Given an input question, create a syntactically correct {dialect} query to run to help find the answer. Unless the user specifies in his question a specific number of examples they wish to obtain, always limit your query to at most {top_k} results. You can order the results by a relevant column to return the most interesting examples in the database.

    Never query for all the columns from a specific table, only ask for the columns that are needed for your question.

    Unless told otherwise, when building your SQL statements, use wildcard case insensitivity.
    Unless told otherwise, when building your SQL statements, always ask for unique or distinct values.
    When using multiple tables in a query, ensure that you always provide table aliases to help the query.

    For any date or time columns needed on output, ensure these are converted to a character format.

    Pay attention to use only the column names that you can see in the schema description for the tables in question. Be careful not to query for columns that do not exist within the table being referenced. Where you refer to multiple tables, pay attention to which column belongs to which table.

    If your query returns no data, then response with 'There are no results for your query'.

    Go back a check your work.

    Only use the following tables:

    {table_info}

    Question: {input}
    """

    SQLPrompt = PromptTemplate(
        input_variables=["input", "table_info", "dialect", "top_k"],
        template=SQLTemplate
    )

    match llmserver:
        case 'ollama':
            model = "sqlcoder:15b"

            llm = getLLMServer(llmserver=llmserver, model=model, num_ctx=10000)
        case 'groq':
            model = "qwen-2.5-coder-32b"

            llm = getLLMServer(llmserver=llmserver, model=model)
        case 'openai':
            model = "gpt-4o-mini"

            llm = getLLMServer(llmserver=llmserver, model=model)
        case 'azureopenai':
            azure_deployment="gpt-4o-mini"
            api_version="2024-10-21" 

            llm = getLLMServer(llmserver=llmserver, azure_deployment=azure_deployment, api_version=api_version)
        case _: # No matching LLM Server
            print(f"Error: Unknown llmserver {llmserver}")
            return None

    print(f"Converting the natural language query to SQL")
    write_query_chain = create_sql_query_chain(llm, db, prompt=SQLPrompt, k=defaultrowlimit)
    response = write_query_chain.invoke({"question": question})
 
    if (verbose):
        print(f"Query Respose = {response}")

    if (verbose):
        print(f"\nNow extracting the raw SQL")

    validate_prompt = PromptTemplate(
        input_variables=["not_formatted_query"],
        template="""You are going to receive a text that contains a SQL query. 
        
        Extract only the query and provide no description of it. Remove any markdown.

        Check that each column being referenced, exists. If it doesn't then make the relevant changes to ensure you're using the correct columns.

        Go back and check your work.

        Text: {not_formatted_query}"""
    )

    print(f"Validating SQL")

    # validate_chain = write_query_chain | validate_prompt | llm | stripSQLMarkup | StrOutputParser()
    validate_chain = write_query_chain | validate_prompt | llm | StrOutputParser()
    valid_sql = validate_chain.invoke({"question": question})

    if (verbose):
        print(f"\n\nValidate SQL = {valid_sql}")

    answer_prompt = PromptTemplate.from_template(
        """You are going to receive a original user question, generated SQL query, and result of said query. You should use this information to answer the original question. Use only information provided to you.

        Original Question: {question}
        SQL Query: {query}
        SQL Result: {result}
        Answer: """
    )

    print(f"Querying database")
    execute_query = QuerySQLDatabaseTool(db=db)

    print(f"Formatting as a natural language response")
    answer_chain = (
        RunnablePassthrough.assign(query=validate_chain).assign(
            result=itemgetter("query") | stripSQLMarkup | execute_query
        )
        | answer_prompt | llm | StrOutputParser()
    )

    response = answer_chain.invoke({"question": question})

    return {
        'sql' : valid_sql,
        'response' : response
    }

# What llm server are you using?
llmserver="openai"      # Valid values are ollama, openai, azureopenai, groq
verbose=False           # SHow debugging while running
defaultrowlimit=5      # set a default limit to the rows returned.  You can specifically ask for more.

def main(llmserver=None, verbose=False):
    while True:
        try:
            prompt = input(f"{llmserver}: Enter a natural language query for the database: ")
            if (len(prompt.strip())):
                result = QueryDatabase(llmserver=llmserver, question=prompt, defaultrowlimit=defaultrowlimit, verbose=verbose)

                print("----------------------------------------------")
                print("\n\nUse the following SQL to run this yourself:\n")
                print(result.get('sql', ''))
                print("\n\nYour question was:\n")
                print(prompt)
                print("\n\nThe answer to your question is:\n")

                print(result.get('response', ''))

        except ValueError as e:
            print(f"Error: {e}")
            continue

if __name__ == "__main__":
    print(f"+=====================================================================================+")
    print(f" Before running this, ensure your environment has LLM keys set (e.g. OPENAI_API_KEY)")
    print(f"  You will also need to configre the database beting queried")   
    print(f"  By default you are constrained to {defaultrowlimit} rows returned. You can ask")   
    print(f"  for different limits as part of your query ")   
    print(f"+=====================================================================================+")
    print(f"Debugging set to {verbose}")

    while True:
        print("Pick an llmserver from one of the following:")
        for l in validLLMServers:
            print(l)
        llmserver = input(f"choice: ")
        if llmserver in validLLMServers:
            break
        print(f"\n'{llmserver}' is not one of {validLLMServers}")
        
    main(llmserver=llmserver)
