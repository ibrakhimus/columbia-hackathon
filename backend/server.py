import requests
import json
from flask import Flask, request
from image_search import image_search
from doc_query import bill_search
from auto_email import support_email
from flask_cors import CORS, cross_origin

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
CORS(app)

@app.route('/', methods=['GET'])
def ayo():
    return "theres nothing here bruh you need more endpoints"

@cross_origin()
@app.route('/get_image/<query>', methods=['GET'])
def get_image(query):
    return image_search(query)

# returns an array of objects
@cross_origin()
@app.route('/get_news/<query>/<amount>', methods=['GET'])
async def get_news(query, amount):    
    response = requests.get("https://api.worldnewsapi.com/search-news", params={
        "api-key": "f6aca0f7577248b5bdfe2484911735ef",
        "text": query, 
        "number": amount,
        "source-countries": "us",
        "language": "en",
        "sort": "publish-time",
        "sort-direction": "DESC"
        })
    print(response.json())
    return response.json()["news"]

@cross_origin()
@app.route('/get_contact_info', methods=['GET'])
def get_contact_info():
    return "contact info"

@cross_origin()
@app.route("/get_doc/<text>/<number>", methods = ["GET"])
def get_doc(text, number):
    return bill_search(text, int(number))

@cross_origin()
@app.route("/get_timeline/<bill_slug>", methods = ["GET"])
async def get_timeline(bill_slug):
    url = "https://api.propublica.org/congress/v1/118/bills/{}.json".format(bill_slug)
    res = requests.get(url, headers=HEADERS)
    timeline = res.json()["results"][0]["actions"]
    return timeline

@app.route("/support_email", methods = ["GET"])
async def support_email_data():
    # if(request.args.get("short_name") != None):
    #     short_name = request.args.get("short_name")
    #     return await support_email(str(short_name))
    # else:
    #     return "No bill name provided"
    return await support_email("Homeownership for DREAMers Act")

if __name__ == '__main__':
    app.run(debug=True)