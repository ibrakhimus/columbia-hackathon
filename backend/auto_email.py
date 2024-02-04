import chromadb.utils.embedding_functions as embedding_functions
import chromadb
from openai import OpenAI

client = chromadb.PersistentClient(path = "./db/")
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key="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",
                model_name="text-embedding-ada-002"
            )

# gpt_client  = OpenAI(api_key = "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")

collection = client.get_collection(name="bill_db", embedding_function=openai_ef)

email_str = "Write a formal email to the following congressmen supporting the following bill which they sponsored. Only respond with the email body and without the subject line as it will be directly  sent. Do not assume any background for the person emailing and highlight parts of the bill. The congressman is {}, who is in the {}, the Bill number is {}, and the bill title is {}"

def generate_generic_email(congressperson_full_name, chamber, bill_number, bill_title):
    # Determine the appropriate title based on the chamber
    title = "Congressman" if chamber.lower() == "house" else "Senator"
    
    email_template = f"""Dear {title} {congressperson_full_name},

I am writing to express my support for the bill numbered {bill_number}, titled "{bill_title}."

I believe this legislation is important and supports values and initiatives that I care deeply about. I understand that the process of reviewing and supporting bills is complex and involves considering the perspectives and needs of many constituents. However, I trust that you will recognize the significance of this bill and consider the positive impact its passage could have on our community and country.

I appreciate your hard work and dedication to serving our community in the {chamber}. It is my hope that you will give this bill your full consideration and support its progress through the legislative process.

Thank you for your attention to this matter and for your continued service.

Sincerely,

[Your Name]"""

    return email_template

# Example usage:
# print(generate_generic_email("Doe", "House", "H.R.1234", "Title of the Bill"))

def support_email(short_name):
    res = collection.get(ids = [short_name], include = [ "documents", "metadatas" ])
    bill_obj = res['metadatas'][0]["json_str"]
    bill_dict = eval(bill_obj)
    name = bill_dict["sponsor_name"]
    chamber  = "house" if bill_dict["bill_id"][0] == "h" else "senate"
    email = name.lower().replace(" ", ".") + "@mail." + chamber + ".gov"
    bill_num = bill_dict["number"]
    title  = bill_dict["title"]
    
    
    # email_body = gpt_client.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=[{"role": "system", "content": email_str.format(name, chamber, bill_num, title)}])
    subject = f"Support for {bill_num} - {short_name}"
    return(email, generate_generic_email(name, chamber, bill_num, title), subject)

if __name__ == "__main__":
    print(support_email("Homeownership for DREAMers Act"))
