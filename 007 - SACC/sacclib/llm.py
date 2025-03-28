import tiktoken
from transformers import AutoTokenizer
from langchain_ollama import ChatOllama
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_openai import AzureChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()   # Load .env values

# Get an estimated number of tokens for some text (OpenAI models). By default this will use cl100_k_base, but you can 
# provide alternative encodings, or change this by using a model name parameter to get for more accurate values
def estimatedTokensFromString(string: str, encoding_name: str = "cl100k_base") -> int:
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens

# # The same estimation approch, but used for Qwen Specifically
# def qwenEstimatedTokensFromString(inputStr):
#     tokenizer = AutoTokenizer.from_pretrained('Qwen/Qwen2.5-7B', trust_remote_code=True)
#     return len(tokenizer.tokenize(inputStr))

# Try to minimise the amount of memory used with Ollama
# Get an estimate of the number of tokens used by the prompt/content and use to preset the tokens needed
# Add 10000 to allow for return paylod
def estimatedTokensRequired(tokenEstimate):
    return int((tokenEstimate * 1.10)) + 10000

#
#   Routine to pull back the metrics used by each LLM type
#   Currently only using Ollama and OpenAI standards, but you can add more
#
def getLLMMetrics(responseMetadata=None, LLMServer=None, model=None, timeDiff=None, verbose=False):

    responseMetrics={
        'model': None,
        'tokensInput': None,
        'tokensOutput': None,
        'tokensTotal': None,
        'timeLoad': None,
        'timeTotal': None
    }

    if (responseMetadata is None):
        print(f"There are no Response Metrics to evaluate... returning")
        return responseMetrics
   
    # print(f"LLM Metrics Response Metadata: {responseMetadata}")
    if (verbose):
        print(f"Extracting {LLMServer} metrics")
    match LLMServer.lower():
        case 'ollama':
            responseMetrics['model'] = responseMetadata.get('model', None)
            responseMetrics['tokensInput'] = responseMetadata.get('prompt_eval_count', None)
            responseMetrics['tokensOutput'] = responseMetadata.get('eval_count', None)
            responseMetrics['tokensTotal'] = responseMetrics.get('tokensInput', 0) + responseMetrics.get('tokensOutput', 0)
            responseMetrics['timeLoad'] = responseMetadata.get('load_duration', None) / float(f"1e9")
            responseMetrics['timeTotal'] = responseMetadata.get('total_duration', None) / float(f"1e9")
            return responseMetrics
              
        case 'openai' | 'azureopenai':
            tokenUsage = responseMetadata.get('token_usage', None)
            if tokenUsage:
                responseMetrics['tokensInput'] = tokenUsage.get('prompt_tokens', None)
                responseMetrics['tokensOutput'] = tokenUsage.get('completion_tokens', None)
                responseMetrics['tokensTotal'] = tokenUsage.get('total_tokens', None)
            responseMetrics['timeTotal'] = timeDiff
            responseMetrics['model'] = responseMetadata.get('model_name', None)
            return responseMetrics
        
        case _:
            print(f"In LLM Metrics: Unknown LLM Server {LLMServer}. Returning empty default")   
    return responseMetrics

#
#   Generic routine to define a Chat LLM handle that can behav as each requires
#
def getLLMServer(llmserver="ollama", model=None, azure_deployment=None, api_version=None, num_ctx=-1):

    match llmserver:
        case 'ollama':
            if (model is None):
                print(f"getLLMServer for server {llmserver}: Error, you must provide a model")
                return None
            
            llm = ChatOllama( model=model,
                                num_ctx = num_ctx,
                                timeout = 600,
                                temperature=0.0,
                                max_tokens=4096,
                                verboseness = True)
        case 'groq':
            if (model is None):
                print(f"getLLMServer for server {llmserver}: Error, you must provide a model")
                return None
            
            GROQ_API_KEY = os.getenv('GROQ_API_KEY') 
            llm = ChatGroq( model=model,
                                groq_api_key=GROQ_API_KEY,
                                timeout = 600,
                                temperature=0.0,
                                max_tokens=None
                                )
        case 'openai':
            if (model is None):
                print(f"getLLMServer for server {llmserver}: Error, you must provide a model")
                return None
            
            OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')             
            llm = ChatOpenAI( model=model,
                                openai_api_key=OPENAI_API_KEY,
                                timeout = 600,
                                temperature=0.0
                                )      
        case 'azureopenai':
            if (azure_deployment is None):
                print(f"getLLMServer for server {llmserver}: Error, you must provide an azure_deployment  and an api_version")
                return None

            AZURE_OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY') 
            AZURE_OPENAI_ENDPOINT=os.getenv('AZURE_OPENAI_ENDPOINT')

            llm = AzureChatOpenAI(
                                openai_api_key=AZURE_OPENAI_API_KEY,
                                azure_deployment=azure_deployment,  # or your deployment
                                api_version=api_version,            # or your api version
                                temperature=0.0,
                                max_tokens=None,
                                timeout=600,
                                max_retries=2,
                                )
        case 'anthropic':
            if (model is None):
                print(f"getLLMServer for server {llmserver}: Error, you must provide a model")
                return None

            ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY') 
            llm = ChatAnthropic( model=model,
                                anthropic_api_key=ANTHROPIC_API_KEY,
                                timeout = 600,
                                max_tokens = 8192,
                                temperature=0.0
                                )
        case _:
            print(f"Error: Unknown llmserver {llmserver}")
            return None
    return llm
