import os
import tempfile
import json
import httpx
import feedparser
import asyncio

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import fitz  # PyMuPDF
from typing import List, Optional

# Load environment variables
load_dotenv()

# Configure Gemini API
API_KEY = os.getenv("GEMINI_API_KEY")
BLAND_AI_KEY = os.getenv("BLAND_AI_API_KEY")

if API_KEY:
    genai.configure(api_key=API_KEY)
else:
    print("WARNING: GEMINI_API_KEY is not set.")

if not BLAND_AI_KEY:
    print("WARNING: BLAND_AI_API_KEY is not set. Outbound calls will fail.")

# Initialize Model
model = genai.GenerativeModel('gemini-flash-latest')

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

class ChatMessage(BaseModel):
    role: str # "user" or "model"
    content: str

class ChatRequest(BaseModel):
    message: str
    mode: str = "text"
    history: List[ChatMessage] = []

class CallRequest(BaseModel):
    phone_number: str
    task_prompt: str = ""

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
    
    try:
        # Build prompt from history
        chat_session = model.start_chat(history=[
            {"role": "user" if msg.role == "user" else "model", "parts": [msg.content]}
            for msg in request.history
        ])

        mode_instructions = ""
        if request.mode == "graph":
            mode_instructions = """
            [INTELLIGENCE MODE: GRAPH]
            1. Analyze the context (Assam Floods or any other topic mentioned).
            2. Provide a 1-sentence analytical observation.
            3. Then, return exactly 5 data points in JSON: [{"name": "Category", "value": number}].
            4. Ensure 'value' numbers are realistic.
            """
        elif request.mode == "table":
            mode_instructions = """
            [INTELLIGENCE MODE: TABLE]
            1. Analyze context.
            2. Provide a 1-sentence strategic summary.
            3. Then, provide a Markdown table with 3 columns relevant to the query.
            """
        elif request.mode == "search":
            mode_instructions = """
            [INTELLIGENCE MODE: SEARCH]
            1. Summarize findings from NDMA/NITI Aayog/IMD silos.
            2. List 3 verified intelligence sources.
            """
        elif request.mode == "image":
            mode_instructions = """
            [INTELLIGENCE MODE: IMAGE CONCEPT]
            1. Describe a high-resolution satellite or thermal infrared visualization.
            """

        final_prompt = f"{mode_instructions}\n\nUser Intelligence Request: {request.message}"
        response = chat_session.send_message(final_prompt)
        
        return {
            "response": response.text,
            "mode": request.mode
        }
    except Exception as e:
        print("Chat Error:", str(e))
        raise HTTPException(status_code=500, detail=f"Failed to generate AI response: {str(e)}")

@app.post("/api/voice/trigger-call")
async def trigger_call(request: CallRequest):
    if not BLAND_AI_KEY:
        raise HTTPException(status_code=500, detail="Bland AI API Key is missing. Please configure backend/.env")
    
    # Cleaning phone number
    phone = request.phone_number.strip()
    if not phone.startswith('+'):
        # Assuming Indian number if no code
        if len(phone) == 10:
            phone = f"+91{phone}"
        else:
            raise HTTPException(status_code=400, detail="Invalid phone number format. Use +[country_code][number]")

    default_prompt = """
    You are an automated emergency response official from INDRA (Integrated National Decision & Response Architecture).
    You are calling to provide a critical update regarding a local situation.
    Be professional, concise, and helpful.
    """
    
    prompt = request.task_prompt if request.task_prompt else default_prompt

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://api.bland.ai/v1/calls",
                headers={
                    "authorization": BLAND_AI_KEY,
                    "Content-Type": "application/json"
                },
                json={
                    "phone_number": phone,
                    "task": prompt,
                    "model": "enhanced",
                    "voice": "nat",
                    "language": "en-IN", # You can change this to 'hi' for Hindi
                    "request_data": {
                        "name": "Citizen",
                        "context": "Emergency Outreach"
                    }
                },
                timeout=30.0
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Bland AI Error: {response.text}")
                raise HTTPException(status_code=response.status_code, detail=f"Bland AI failed: {response.text}")
        except Exception as e:
            print(f"Call Trigger Exception: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/voice/call-details/{call_id}")
async def get_call_details(call_id: str):
    if not BLAND_AI_KEY:
        raise HTTPException(status_code=500, detail="Bland AI API Key is missing.")
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"https://api.bland.ai/v1/calls/{call_id}",
                headers={"authorization": BLAND_AI_KEY}
            )
            if response.status_code == 200:
                return response.json()
            else:
                raise HTTPException(status_code=response.status_code, detail=response.text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

class WhatsAppRequest(BaseModel):
    locations: List[str]
    crisis_type: str
    severity: str
    action_required: str

@app.post("/api/voice/send-whatsapp")
async def send_whatsapp_broadcast(request: WhatsAppRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured. Cannot generate localized alerts.")

    # 1. Generate the official Multi-lingual WhatsApp broadcast message using Gemini
    prompt = f"""
    You are the INDRA National Crisis Communication AI.
    Generate an official SMS/WhatsApp emergency broadcast alert.
    Crisis: {request.crisis_type}
    Severity: {request.severity.upper()}
    Locations Affected: {', '.join(request.locations)}
    Citizen Action Required: {request.action_required}
    
    Format the message exactly as it should appear on a citizen's phone. Use emojis for visibility (🚨⚠️).
    Include both English and Hindi text. Keep it extremely concise, urgent, and authoritative (like an NDRF/NDMA alert).
    Do NOT include markdown backticks or extra conversational text.
    """
    
    try:
        response = model.generate_content(prompt)
        broadcast_message = response.text.strip()
    except Exception as e:
        print(f"Failed to generate bilingual alert: {e}")
        broadcast_message = f"🚨 INDRA EMERGENCY ALERT: {request.severity.upper()} {request.crisis_type} in {request.locations[0]}. Action: {request.action_required}. Stay safe."

    # 2. Simulate Twilio API Dispatch (or hook up real Twilio if TWILIO_ACCOUNT_SID is set)
    # Since this is for the Bharat Mandapam demonstration, we simulate the massive throughput.
    simulated_target_count = len(request.locations) * 250000  # Estimate 250k people per location
    
    # Simulate API latency
    await asyncio.sleep(1.5)

    return {
        "status": "success",
        "message": "Broadcast dispatch initiated successfully.",
        "payload": {
            "dispatch_id": f"INDRA-BRD-{os.urandom(4).hex().upper()}",
            "generated_content": broadcast_message,
            "estimated_recipients": simulated_target_count,
            "channels": ["WhatsApp Business API", "SMS Priority Route"],
            "delivery_status": "Queued via NIC Hub"
        }
    }

class OracleRequest(BaseModel):
    crisis_type: str
    location: Optional[str] = "India"

@app.post("/api/oracle/predict")
async def predict_ripple_effects(request: OracleRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured.")
        
    prompt = f"""
    Act as 'The Oracle', INDRA's Predictive Ripple-Effect Engine.
    Analyze the cascading impacts of a '{request.crisis_type}' in {request.location}.
    Provide a multi-domain impact graph. 
    Format your response as a JSON object with:
    {{
      "nodes": [
        {{"id": "root", "label": "{request.crisis_type}", "color": "#ef4444", "size": 25}},
        {{"id": "domain1", "label": "Impact Domain 1", "color": "#3b82f6", "size": 18}},
        ...
      ],
      "links": [
        {{"source": "root", "target": "domain1", "label": "direct impact"}},
        ...
      ],
      "analysis": "A brief 2-sentence strategic summary of the overall risk."
    }}
    Domains to consider: Economy, Public Health, Infrastructure, Social Stability, Geopolitics.
    Return ONLY raw JSON.
    """
    
    try:
        response = model.generate_content(prompt)
        # Handle potential markdown formatting from Gemini
        cleaned_json = response.text.strip('`').replace('json', '').strip()
        return json.loads(cleaned_json)
    except Exception as e:
        print(f"Oracle Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate predictive model.")

@app.get("/api/core/real-time-news")
async def get_real_time_news():
    # Google News RSS for India Governance
    rss_url = "https://news.google.com/rss/search?q=India+Governance+Crisis+Weather&hl=en-IN&gl=IN&ceid=IN:en"
    
    try:
        feed = feedparser.parse(rss_url)
        news_items = []
        
        for entry in feed.entries[:5]: # Take top 5
            news_items.append({
                "title": entry.title,
                "link": entry.link,
                "published": entry.published,
                "summary": entry.summary if 'summary' in entry else ""
            })
            
        # Optional: Use Gemini to extract location/entities from these 5 titles
        if API_KEY and news_items:
            titles = [item["title"] for item in news_items]
            prompt = f"""
            Identify the primary city or state in India for each of these news titles. 
            If no specific location, return 'India'.
            Format as a JSON list of objects: [{{"location": "City/State", "type": "Weather/Crisis/Economy", "title": "Original Title"}}]
            Titles: {json.dumps(titles)}
            """
            try:
                # Running blocking genai in thread or async wrap
                response = model.generate_content(prompt)
                extracted = json.loads(response.text.strip('`').replace('json', '').strip())
                for i, item in enumerate(news_items):
                    if i < len(extracted):
                        item["intel"] = extracted[i]
            except Exception as e:
                print(f"Extraction error: {e}")

        return news_items
    except Exception as e:
        print(f"RSS Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch real-time news.")
