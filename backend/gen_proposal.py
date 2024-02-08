from openai import OpenAI
import os 
from dotenv import load_dotenv
load_dotenv()
gpt_client  = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))

def read_file (file):
    with open(file, 'r') as file:
        return file.read()
    
# def save_file(content):
#     with open("gpt_res.txt", 'w') as file:
#         file.write(content)

def create_proposal(bill_info, sentiment, additional_info):
    sys_role = read_file("./sys_role.txt")
    gpt_query = f"Bill Name: {bill_info}\nUser's Opinion: {sentiment}\nAdditional Info: {additional_info}"
    
    res = gpt_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": sys_role},
                  {"role": "user", "content": gpt_query}])
    return res.choices[0].message.content

# if __name__ == "__main__":
#     res = create_proposal("extended medical aid for DACA families")
#     save_file(str(res))
