import chromadb.utils.embedding_functions as embedding_functions
import chromadb
from torch.nn.functional  import cosine_similarity

client = chromadb.PersistentClient(path = "./db/")
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key="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",
                model_name="text-embedding-ada-002"
            )

collection = client.get_collection(name="bill_db", embedding_function=openai_ef)

def bill_search(text, n_results = 1, include = ["documents", "metadatas", "distances"]):
    response = collection.query(
        query_texts = [text],
        n_results = n_results,
        include = include
    )
    return response

# if __name__ == "__main__":
#     print(bill_search("DACA", 1, ["documents", "metadatas", "distances"]))