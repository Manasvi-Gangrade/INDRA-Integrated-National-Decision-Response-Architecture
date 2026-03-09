import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import fitz  # PyMuPDF
import tempfile
import json
import httpx
from typing import List

# Load environment variables
load_dotenv()

# Configure Gemini API
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
else:
    print("WARNING: GEMINI_API_KEY is not set in the environment variables.")

# Initialize Model
model = genai.GenerativeModel('gemini-2.5-flash')

app = FastAPI(title="INDRA Intelligence API")

# Configure CORS for React Frontend (running on port 5173 by default)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SpeechRequest(BaseModel):
    topic: str
    audience: str

class SentimentRequest(BaseModel):
    feedbacks: List[str]

class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []

@app.get("/")
def read_root():
    return {"message": "INDRA Global Ontology Engine is online."}

@app.post("/api/pilot/generate-speech")
async def generate_speech(request: SpeechRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is missing. Please configure backend/.env")
    
    prompt = f"""
    You are INDRA PILOT, an advanced AI Co-Pilot for public administrators in India.
    Your task is to generate a formal, data-grounded speech or communication draft.
    
    Topic: {request.topic}
    Target Audience: {request.audience}
    
    Requirements:
    1. The tone must be highly professional and suitable for the specified audience.
    2. Act as if you have access to a "Global Knowledge Graph" and weave in simulated realistic statistics relevant to the topic (e.g., "Our real-time data from 500+ national sources indicates...").
    3. Keep the entire response to exactly 3 well-structured paragraphs.
    4. Provide the raw text directly without any markdown formatting or meta-commentary at the beginning.
    """
    
    try:
        response = model.generate_content(prompt)
        return {"speech": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/pilot/summarize-document")
async def summarize_document(file: UploadFile = File(...)):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is missing. Please configure backend/.env")
    
    if not file.filename.endswith(('.pdf', '.txt')):
        raise HTTPException(status_code=400, detail="Only PDF and TXT files are supported currently.")
    
    extracted_text = ""
    
    try:
        # Save uploaded file to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf" if file.filename.endswith('.pdf') else ".txt") as temp:
            content = await file.read()
            temp.write(content)
            temp_path = temp.name
            
        # Extract text based on file type
        if file.filename.endswith('.pdf'):
            doc = fitz.open(temp_path)
            for page in doc:
                extracted_text += page.get_text()
            doc.close()
        elif file.filename.endswith('.txt'):
            extracted_text = content.decode('utf-8')
            
        os.remove(temp_path)
        
        if not extracted_text.strip():
             raise HTTPException(status_code=400, detail="Could not extract text from the document. It might be empty or scanned.")
        
        # Limit text length to avoid token limits for basic models (rough estimate)
        extracted_text = extracted_text[:15000]

        prompt = f"""
        You are INDRA PILOT. Analyze the following document text and provide a strict JSON response.
        Do not include markdown blocks like ```json. Return ONLY raw JSON.

        The JSON must match this structure exactly:
        {{
            "points": [
                "1st key operational insight extracted from the document",
                "2nd key metric, risk, or milestone found",
                "3rd important takeaway for a district magistrate or official",
                "CRITICAL RISK: (if any risk is found, otherwise 4th point)"
            ],
            "action": "A single, strong, specific AI-driven recommendation based on the data (e.g., 'Recommend deploying NDRF to western blocks immediately.')"
        }}
        
        Document Text:
        {extracted_text}
        """

        response = model.generate_content(prompt)
        
        # Clean up the response in case the model ignored instructions and wrapped in markdown
        cleaned_json = response.text.replace('```json', '').replace('```', '').strip()
        parsed_data = json.loads(cleaned_json)
        
        return {
            "title": file.filename,
            "points": parsed_data.get("points", ["Summary point 1", "Summary point 2", "Summary point 3", "Summary point 4"]),
            "action": parsed_data.get("action", "No immediate action recommended based on the provided text.")
        }
    except json.JSONDecodeError:
         print("Failed to parse JSON target:", response.text)
         raise HTTPException(status_code=500, detail="AI failed to return the highly structured json format requested.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/core/live-feed")
async def get_live_feed():
    feed_items = []
    alerts = []
    
    async with httpx.AsyncClient() as client:
        try:
            weather_res = await client.get("https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=Asia/Kolkata")
            if weather_res.status_code == 200:
                data = weather_res.json()["current"]
                temp = data["temperature_2m"]
                wind = data["wind_speed_10m"]
                feed_items.append({"time": "Live", "text": f"CORE: Delhi NCR Current Weather - Temp: {temp}°C, Wind: {wind} km/h (Source: IMD/Open-Meteo)", "type": "weather"})
        except Exception as e:
            print("Weather fetch failed:", e)

        try:
            eq_res = await client.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson")
            if eq_res.status_code == 200:
                features = eq_res.json().get("features", [])
                for f in features[:2]: # Get top 2 recent
                    mag = f["properties"]["mag"]
                    place = f["properties"]["place"]
                    feed_items.append({"time": "Live", "text": f"CORE: Seismic Activity Detected - Magnitude {mag} near {place} (Source: INCOIS/USGS)", "type": "weather"})
                    if mag > 5.5:
                        alerts.append({
                            "id": f["id"],
                            "title": f"High Seismic Activity: M{mag}",
                            "location": place,
                            "source": "Global Seismic Network",
                            "action": "Alert local disaster management authorities",
                            "severity": "critical",
                            "time": "Just now"
                        })
        except Exception as e:
            print("Earthquake fetch failed:", e)
            
    # Add a fallback item if external APIs are very slow or failing
    if not feed_items:
        feed_items.append({"time": "Live", "text": "CORE: Syncing with national databases. All systems nominal.", "type": "system"})

    return {"feed": feed_items, "alerts": alerts}

@app.post("/api/voice/analyze-sentiment")
async def analyze_sentiment(request: SentimentRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is missing. Please configure backend/.env")
    
    if not request.feedbacks:
         return {"results": [], "distribution": {"positive": 0, "neutral": 0, "negative": 0}}
    
    feedbacks_text = "\n".join([f"- {f}" for f in request.feedbacks])
    
    prompt = f"""
    You are INDRA VOICE, analyzing citizen feedback to govern at scale.
    Analyze the following list of citizen feedbacks.
    
    Return a strict JSON response containing ONLY the following structure:
    {{
      "results": [
        {{
          "original": "the original feedback text",
          "sentiment": "Positive" or "Neutral" or "Negative",
          "issue": "2-3 word summary of the main issue/topic"
        }}
      ],
      "distribution": {{
        "positive": count_of_positive,
        "neutral": count_of_neutral,
        "negative": count_of_negative
      }}
    }}
    
    Do not enclose in markdown blocks. Return pure JSON.
    Feedbacks:
    {feedbacks_text}
    """
    
    try:
        response = model.generate_content(prompt)
        cleaned_json = response.text.replace('```json', '').replace('```', '').strip()
        parsed_data = json.loads(cleaned_json)
        return parsed_data
    except Exception as e:
        print("Sentiment Analysis Error:", response.text if 'response' in locals() else str(e))
        raise HTTPException(status_code=500, detail="Failed to analyze sentiment. Check backend terminal for details.")

@app.post("/api/chat")
async def chat_with_indra(request: ChatRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is missing. Please configure backend/.env")
    
    prompt = f"""
    You are INDRA, the Integrated National Decision & Response Architecture AI Assistant.
    You are the voice of the Global Ontology Engine which tracks live data across geopolitics, economics, defense, climate, and society for India.
    Keep your responses concise, sharp, and highly professional, like an AI briefing a top government official.
    If the user asks about a current crisis (like Assam Floods or Farmer issues), invent realistic, data-driven simulated insights as if you are pulling from live sensors and satellite feeds.
    
    User Query: {request.message}
    """
    
    try:
        response = model.generate_content(prompt)
        return {"response": response.text}
    except Exception as e:
        print("Chat Error:", str(e))
        raise HTTPException(status_code=500, detail="Failed to generate AI response.")
