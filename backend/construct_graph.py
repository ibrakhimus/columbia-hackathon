import chromadb.utils.embedding_functions as embedding_functions
import chromadb
import json
import numpy as np

client = chromadb.PersistentClient(path = "./db/")
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key="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",
                model_name="text-embedding-ada-002"
            )

collection = client.get_collection(name="bill_db", embedding_function=openai_ef)
# json_data = collection.get(include =  ["documents", "metadatas", "embeddings"])

id_count = 0
to_id = {}

with open("total_db.json", "r") as f:
    json_data = json.load(f)

docs =  json_data["documents"][:3000]
ids = json_data["ids"][:3000]
embeddings = json_data["embeddings"][:3000]
metadata = json_data["metadatas"][:3000]
metadata = [eval(obj["json_str"]) for obj in metadata]



for i in range(len(ids)):
    to_id[ids[i]] = i


hot_topics = [
    "Healthcare Reform", "Climate Change", "Economic Policy",
    "Immigration", "National Security", "Education Reform",
    "Gun Control", "Technology and Privacy", "Tax Reform",
    "Foreign Policy", "Veterans' Affairs", "Criminal Justice Reform",
    "Infrastructure", "Agriculture Policy", "Labor and Employment",
    "Energy Policy", "Social Security", "Drug Policy",
    "Civil Rights", "Campaign Finance", "Housing Policy",
    "International Trade", "Environmental Protection",
    "Banking and Finance", "Consumer Protection"
]

topic_to_group = {hot_topics[i]: i for i in range(len(hot_topics))}

topic_client = chromadb.Client()
topic_coll = topic_client.create_collection(name="hot_topics_db", embedding_function=openai_ef, metadata = {"hnsw:space": "cosine"})

topic_coll.add(ids = hot_topics, documents = hot_topics)

def topic_pick(sentence):
    response  = topic_coll.query(
        query_texts = sentence,
        n_results = 1,
        include  = ["documents"]
    )
    return response["documents"]

def edge_pick(sentence):
    response  = collection.query(
        query_texts = sentence,
        n_results = 5,
        include  = []
    )
    return response["ids"][1:]


topics = []
edges = []
for i in range(0,3001, 400):
    topics += topic_pick(docs[i:i+400])
    edges += edge_pick(docs[i:i+400])

edge_list = []
nodes = []
x_coords = []
y_coords = []

# Generate points
for _ in range(25):
    angle = np.random.uniform(0, 2 * np.pi)
    r = np.sqrt(np.random.uniform(0, 1)) * 10000
    x = r * np.cos(angle)
    y = r * np.sin(angle)
    x_coords.append(x)
    y_coords.append(y)

for i in range(2991):
    grp = topic_to_group[topics[i][0]]
    nodes.append({
        "id": i,
        "label": ids[i],
        "title": docs[i],
        "value": 10*metadata[i]["cosponsors"],
        "group": grp+1,
        "x": x_coords[grp] +  np.random.normal(0, 1500),
        "y": y_coords[grp] +  np.random.normal(0, 1500),
    })
    
    print(i, len(edges[i]))
    for val in edges[i]:
        try:
            edge_list.append({"from":i,"to": to_id[val]})
        except:
            pass
with open("graph_data.json", "w") as f:
    json.dump({"nodes": nodes, "edges": edge_list}, f)
print(len(nodes))
print(len(edge_list))