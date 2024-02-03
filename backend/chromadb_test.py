import chromadb.utils.embedding_functions as embedding_functions
import chromadb
import torch
import json
from torch.nn.functional  import cosine_similarity

client = chromadb.PersistentClient(path = "./db/")
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key="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",
                model_name="text-embedding-ada-002"
            )

collection = client.get_collection(name="bill_db", embedding_function=openai_ef)

response = collection.query(
    query_texts = ["DACA"],
    n_results = 5,
    include = ["documents"]
)

print(response)