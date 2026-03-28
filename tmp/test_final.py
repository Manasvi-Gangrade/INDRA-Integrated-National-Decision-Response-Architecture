import os
import google.generativeai as genai
from dotenv import load_dotenv

env_path = r"c:\Users\MANASVI\OneDrive\Desktop\INDRA\backend\.env"
load_dotenv(env_path)

API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

print(f"Testing 'gemini-flash-latest'...")
try:
    model = genai.GenerativeModel('gemini-flash-latest')
    response = model.generate_content("Testing connection. Respond with 'STABLE'.")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"FAILURE: {e}")
