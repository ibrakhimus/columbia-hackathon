import chromadb.utils.embedding_functions as embedding_functions
import chromadb
import json
import ast
import os
from dotenv import load_dotenv
load_dotenv()

client = chromadb.PersistentClient(path = "./db/")
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key=os.getenv("OPENAI_API_KEY"),
                model_name="text-embedding-ada-002"
            )

collection = client.get_collection(name="bill_db", embedding_function=openai_ef)

def bill_search(text, n_results = 1, include = ["documents", "metadatas", "distances"]):
    response = collection.query(
        query_texts = [text],
        n_results = n_results,
        include = include
    )
    print(response)
    try:
    # Iterate over each item in the first sublist of 'metadatas' and parse the JSON string
        response["metadatas"] = [[ast.literal_eval(obj["json_str"]) for obj in sublist] for sublist in response["metadatas"]]
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
    return response

# def doc_by_id(text):
#     response = collection.get(ids = [text], include = ["metadatas"],  n_results = 1)
#     try:
#     # Iterate over each item in the first sublist of 'metadatas' and parse the JSON string
#         response["metadatas"] = [[ast.literal_eval(obj["json_str"]) for obj in sublist] for sublist in response["metadatas"]]
#     except json.JSONDecodeError as e:
#         print(f"Error decoding JSON: {e}")
#     return response
# if __name__ == "__main__":
#     print(bill_search("DACA", 1, ["documents", "metadatas", "distances"]))