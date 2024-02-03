import requests
import json

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
data = {}

# stable difussion image
multiples = list(range(0, OFFSET_N, 20))

for i in multiples:
    try:
        request_string = BASEURL+SEARCH_BILL + OFFESET_S.format(i)
        api_request = requests.get(request_string, headers = HEADERS)
        response = json.loads(api_request.content)
        data[i] = response
        print(i)
    except:
        pass
    
with open('data.json', 'w') as f:
    json.dump(data, f)