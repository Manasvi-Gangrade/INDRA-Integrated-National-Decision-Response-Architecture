import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from the project's backend/.env
env_path = r"c:\Users\MANASVI\OneDrive\Desktop\INDRA\backend\.env"
load_dotenv(env_path)

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("ERROR: GEMINI_API_KEY not found in .env")
    exit(1)

print(f"Using API Key: {API_KEY[:10]}...")

try:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Testing INDRA Intelligence Core connection. Reply with 'STABLE'.")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"FAILURE: {str(e)}")
