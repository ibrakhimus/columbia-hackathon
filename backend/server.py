import requests
import json
from flask import Flask

HEADERS = {'X-API-Key': 'flXU8LPnz82pSjKUSQEWWQd4YfpKuLfDGe9DXw50'}
BASEURL = "https://api.propublica.org/congress/v1/"
CONGRES_SESSION = "117"
SEARCH_BILL = "bills/search.json?"
QUERY = "&query={}"
OFFESET_S = "&offset={}"
OFFSET_N = 10000
# use `.format()` to add params to the query
    # leave in paranthesis to search as one term 
    # or dont include parenthesis to search multiple terms
def read_file (file_path):
    with open(file_path, 'r') as file:
        return file.read()

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello():
    "name, bill title, bill type, "
    return "theres nothing here bruh"

@app.route('/search/<string:query>', methods=['GET'])
def search(query):
    # perform a search for the data from .json file
    # using vector
    return query 


if __name__ == '__main__':
    app.run(debug=False)