from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import aiohttp
import os

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for incoming message
class Message(BaseModel):
    message: str

RASA_URL = os.getenv("RASA_URL", "http://localhost:5005/webhooks/rest/webhook")

@app.post("/chat")
async def chat_with_bot(msg: Message):
    async with aiohttp.ClientSession() as session:
        async with session.post(RASA_URL, json={"sender": "user", "message": msg.message}) as rasa_response:
            rasa_reply = await rasa_response.json()
            reply_texts = [r.get("text", "") for r in rasa_reply if r.get("text")]
            return {"messages": reply_texts if reply_texts else ["I'm not sure how to help with that."]}


