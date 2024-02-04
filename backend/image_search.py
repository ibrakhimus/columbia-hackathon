import json
import os
from pprint import pprint
import requests


# Add your Bing Search V7 subscription key and endpoint to your environment variables.

endpoint = "https://api.bing.microsoft.com/v7.0/images/search"

# Query to search for

def image_search(query):


    # Construct a request
    mkt = 'en-US'
    params = {'q': query, 'mkt': mkt}
    headers = {'Ocp-Apim-Subscription-Key': "bc459722f264429897627d3b3dc675cd"}

    response = requests.get(endpoint, headers=headers, params=params)
    response.raise_for_status()

    return(response.json()["value"][0]["contentUrl"])
