import requests
import json
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
# use `.format()` to add params to the query
    # leave in paranthesis to search as one term 
    # or dont include parenthesis to search multiple terms
data = {}

def read_file (file_path):
    with open(file_path, 'r') as file:
        return file.read()

data = json.loads(read_file('data.json'))

# Get data from the ProPublica API
# stable difussion image
multiples = list(range(0, OFFSET_N, 20))

# for i in multiples:
#     try:
#         request_string = BASEURL+SEARCH_BILL + OFFESET_S.format(i)
#         api_request = requests.get(request_string, headers = HEADERS)
#         response = json.loads(api_request.content)
#         data[i] = response
#         print(i)
#     except:
#         pass
    
for i in multiples:
    try:
        # nav to bill_uri
        num_results = data[str(i)]['results'][0]['num_results']
        for j in range(num_results):
            bill_uri = data[str(i)]['results'][0]['bills'][j]['bill_uri']

            api_request = requests.get(bill_uri, headers = HEADERS)
            response = json.loads(api_request.content)

            data[str(i)]['results'][0]['bills'][j]['bill_info'] = response
            print(i, j)

        # api_request = requests.get(bill_uri, headers = HEADERS)
        # response = json.loads(api_request.content)
        # data[i] = response
        # print(i)
    except:
        print("excepttion")
        pass
with open('data.json', 'w') as f:
    json.dump(data, f)