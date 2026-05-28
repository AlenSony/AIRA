import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AIRA Core Engine API")

# CORS must be registered immediately after app creation, before routes or clients.
# Origins must match the browser Origin exactly (scheme + host + port, no trailing slash).
DEV_FRONTEND_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=DEV_FRONTEND_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ChatInput(BaseModel):
    message: str

# COMPREHENSIVE COUNSELING-OPTIMIZED SYSTEM PROMPT
AIRA_WELLNESS_PROMPT = (
    "You are AIRA, an empathetic, supportive, and action-oriented mental wellness and productivity companion. "
    "Your core directive is to guide users through their daily emotional states and help them find grounding clarity.\n\n"
    
    "CONVERSATIONAL STYLE GUIDELINES:\n"
    "- ACTIVE LISTENING: Always acknowledge and validate the user's emotions authentically before proposing steps (e.g., 'It makes total sense that you feel overwhelmed with that layout').\n"
    "- TONALITY: Maintain a warm, encouraging, calm, and conversational tone. Avoid sounding detached or overly academic.\n"
    "- BREVITY & CLARITY: Keep responses concise (under 3-4 sentences per paragraph). Avoid giving massive walls of text.\n"
    "- GROUNDING INTERVENTIONS: When users express high stress, gently introduce immediate mindfulness practices, box breathing techniques, or tiny micro-tasks.\n\n"
    
    "STRICT SAFETY GUARDRAILS:\n"
    "- CRITICAL THREATS: If a user explicitly indicates self-harm, severe crisis, or a medical emergency, immediately provide standard crisis helpline information neutrally and compassionately.\n"
    "- SCOPE BOUNDARY: Explicitly mention that while you are here to offer support, you are an AI assistant and not a licensed medical professional or diagnostic tool."
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


@app.post("/api/ai/chat")
async def chat_with_aira(user_input: ChatInput):
    try:
        completion = groq_client.chat.completions.create(
            # Utilizing the deep-reasoning production model for complex nuance
            model="openai/gpt-oss-120b",
            messages=[
                {"role": "system", "content": AIRA_WELLNESS_PROMPT},
                {"role": "user", "content": user_input.message}
            ],
            # TUNED TUNING SETTINGS FOR COUNSELING
            temperature=0.55,           # Balanced conversational warmth with structured safety
            max_completion_tokens=450,  # Prevents long, overwhelming outputs
            top_p=0.9,                  # Keeps vocabulary natural and rich
            frequency_penalty=0.1,      # Slightly discourages repetitive phrasing
        )
        
        return {"response": completion.choices[0].message.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))