import chromadb.utils.embedding_functions as embedding_functions
import chromadb
from openai import OpenAI

client = chromadb.PersistentClient(path = "./db/")
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key="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",
                model_name="text-embedding-ada-002"
            )

gpt_client  = OpenAI(api_key = "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")

collection = client.get_collection(name="bill_db", embedding_function=openai_ef)

email_str = "Write a formal email to the following congressmen supporting the following bill which they sponsored. Only respond with the email body and without the subject line as it will be directly  sent. Do not assume any background for the person emailing and highlight parts of the bill. The congressman is {}, who is in the {}, the Bill number is {}, and the bill title is {}"

def support_email(short_name):
    res = collection.get(ids = [short_name], include = [ "documents", "metadatas" ])
    bill_obj = res['metadatas'][0]["json_str"]
    bill_dict = eval(bill_obj)
    name = bill_dict["sponsor_name"]
    chamber  = "house" if bill_dict["bill_id"][0] == "h" else "senate"
    email = name.lower().replace(" ", ".") + "@mail." + chamber + ".gov"
    bill_num = bill_dict["number"]
    title  = bill_dict["title"]
    email_body = gpt_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": email_str.format(name, chamber, bill_num, title)}])
    subject = f"Support for {bill_num} - {short_name}" 
    return(email, email_body.choices[0].message, subject)
if __name__ == "__main__":
    print(support_email("Homeownership for DREAMers Act"))
