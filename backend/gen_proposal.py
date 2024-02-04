from openai import OpenAI
gpt_client  = OpenAI(api_key = "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")

def read_file (file):
    with open(file, 'r') as file:
        return file.read()
    
# def save_file(content):
#     with open("gpt_res.txt", 'w') as file:
#         file.write(content)

def create_proposal(bill_info):
    sys_role = read_file("./sys_role.txt")
    res = gpt_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": sys_role},
                  {"role": "user", "content": bill_info}])
    return res.choices[0].message.content

# if __name__ == "__main__":
#     res = create_proposal("extended medical aid for DACA families")
#     save_file(str(res))
