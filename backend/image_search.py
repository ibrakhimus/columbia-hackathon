import json
import os
from pprint import pprint
import requests
from dotenv import load_dotenv
load_dotenv()

# Add your Bing Search V7 subscription key and endpoint to your environment variables.

endpoint = "https://api.bing.microsoft.com/v7.0/images/search"

# Query to search for

def image_search(query):
    # Construct a request
    mkt = 'en-US'
    params = {'q': query, 'mkt': mkt, "aspect": "Tall"}
    headers = {'Ocp-Apim-Subscription-Key': os.getenv("BING_API_KEY")}

    response = requests.get(endpoint, headers=headers, params=params)
    response.raise_for_status()
    return(response.json()["value"][0]["contentUrl"])

def face_search(query):
    # Construct a request
    mkt = 'en-US'
    params = {'q': query, 'mkt': mkt, "imageContent": "Face"}
    headers = {'Ocp-Apim-Subscription-Key': os.getenv("BING_API_KEY")}

    response = requests.get(endpoint, headers=headers, params=params)
    response.raise_for_status()

    return(response.json()["value"][0]["contentUrl"])
