import chromadb.utils.embedding_functions as embedding_functions
import chromadb
import json
import os
from dotenv import load_dotenv
load_dotenv()

client = chromadb.PersistentClient(path = "./db/")
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key=os.getenv("OPENAI_API_KEY"),
                model_name="text-embedding-ada-002"
            )
filtering_dict = {}
with open("merged_bills.json", "r", encoding = "utf-8") as f:
    bills_dict = json.load(f)
    filtering_dict = {obj["short_title"]: obj for obj in bills_dict}

collection = client.create_collection(name = "bill_db", embedding_function= openai_ef,metadata={"hnsw:space": "cosine"})
for i in range(0, 8001,500):
    bills_dict = list(filtering_dict.values())[i:i+500]

    documents = [obj["title"] for obj in bills_dict]
    metadata = [{"json_str": str(obj)} for obj in bills_dict]
    ids = [obj["short_title"] for obj in bills_dict]

    

    collection.add(documents = documents, metadatas = metadata,  ids = ids)

