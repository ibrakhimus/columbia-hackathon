from openai import OpenAI
from tavily import TavilyClient

gpt_client  = OpenAI(api_key = "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")
tavily = TavilyClient(api_key = "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")

def create_proposal(topic):
    context_json = tavily.search(query = f"List resources that would relate to a policy proposal on: {topic}",  include_raw_content = "True")
    print([obj["raw_content"] for obj in context_json["results"]])


if __name__ == "__main__":
    create_proposal("extended medical aid for DACA families")
