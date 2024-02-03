import requests
import json
import random
ENDPOINT = "https://serpapi.com/search.json"
API_KEY = '04e947af88ca30f1f0c38e03150ad446a2fc4b7fc424bb0694d863dcc8274037'

def image_search(query):
    params = {
        'q': query,
        'tbm': 'isch',  # this is for image search
        'api_key': API_KEY
    }
    response = requests.get(ENDPOINT, params=params)
    
    if response.status_code == 200:
        return response.json()["images_results"][random.randint(0, len(response.json()["images_results"]))]["original"]
    else:
        return f"Error: {response.status_code}"
