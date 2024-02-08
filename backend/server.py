import requests
import json
from flask import Flask, request
from image_search import image_search, face_search
from doc_query import bill_search
from auto_email import support_email
from flask_cors import CORS, cross_origin
from gen_proposal import create_proposal
import os
from dotenv import load_dotenv
load_dotenv()

HEADERS = {'X-API-Key': os.getenv("PROPUBLICA_API_KEY")}
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

@cross_origin()
@app.route('/get_face/<query>', methods=['GET'])
def get_face(query):
    return face_search(query)


# returns an array of objects
@cross_origin()
@app.route('/get_news/<query>/<amount>', methods=['GET'])
async def get_news(query: str, amount: int) -> json:    
    response = requests.get("https://api.worldnewsapi.com/search-news", params={
        "api-key": os.getenv("WORLD_NEWS_API_KEY"),
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

# @cross_origin()
# @app.route("/get_doc_by_id/<text>", methods = ["GET"])
# def get_by_id(text):
#     return doc_by_id(text)

@cross_origin()
@app.route("/get_timeline/<bill_slug>", methods = ["GET"])
async def get_timeline(bill_slug):
    url = "https://api.propublica.org/congress/v1/118/bills/{}.json".format(bill_slug)
    res = requests.get(url, headers=HEADERS)
    timeline = res.json()["results"][0]["actions"]
    return timeline

@cross_origin()
@app.route("/support_email/<short_name>", methods = ["GET"])
async def support_email_data(short_name):
    return support_email(short_name)

# param names: bill_info, bill_opinion, additional_info (optional)
@cross_origin()
@app.route("/gen_bill_proposal", methods = ["POST"])
def gen_bill_proposal():
    if((str(request.args.get("bill_info")) != None) and (str(request.args.get("bill_opinion")) != None)):
        return create_proposal(str(request.args.get("bill_info")), str(request.args.get("bill_opinion")), str(request.args.get("additional_info")))
    return "invalid request - please provide bill_name, bill_opinion, additional_info (optional)"

if __name__ == '__main__':
    app.run(debug=True)