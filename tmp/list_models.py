import os
import google.generativeai as genai
from dotenv import load_dotenv

env_path = r"c:\Users\MANASVI\OneDrive\Desktop\INDRA\backend\.env"
load_dotenv(env_path)

API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

print("Listing available models...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Model: {m.name}")
except Exception as e:
    print(f"Error listing models: {e}")
