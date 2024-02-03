import requests
import json
from flask import Flask
from image_search import image_search
from world_news import get_news

HEADERS = {'X-API-Key': 'flXU8LPnz82pSjKUSQEWWQd4YfpKuLfDGe9DXw50'}
BASEURL = "https://api.propublica.org/congress/v1/"
CONGRES_SESSION = "117"
SEARCH_BILL = "bills/search.json?"
QUERY = "&query={}"
OFFESET_S = "&offset={}"
OFFSET_N = 10000

def read_file (file_path):
    with open(file_path, 'r') as file:
        return file.read()

app = Flask(__name__)

@app.route('/', methods=['GET'])
def ayo():
    return "theres nothing here bruh"

@app.route('/search_bill/<string:query>', methods=['GET'])
def search(query):
    # using vector
    return query 

@app.route('/get_image/<query>', methods=['GET'])
def get_image(query):
    return image_search(query)

@app.route('/get_news/<query>', methods=['GET'])
async def get_news(query):
    response = requests.get("https://api.worldnewsapi.com/search-news", params={
        "api-key": "d854699510c743a9b860bab2675b1b4d",
        "text": query, 
        "source-countries": "us",
        "language": "en",
        "sort": "publish-time",
        "sort-direction": "DESC",
        })
    return response.json()

@app.route('/get_contact_info', methods=['GET'])
def get_contact_info():
    return "contact info"

if __name__ == '__main__':
    app.run(debug=False)