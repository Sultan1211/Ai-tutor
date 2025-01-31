from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv
import logging
import json
from typing import Optional

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# Set up logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str
    tutor: str = "Default"
    message_count: int
    apiKey: str

print("Loaded API Key:", api_key)  # Ensure it's not None

# Helper function to generate interactive assignments
def generate_assignment(user_message: str, api_key: str) -> Optional[dict]:
    assignment_prompt = f"""You are a Python programming tutor for a child.
Generate a very simple and specific question or a short interactive coding exercise based on the last few conversation turns.
Provide the answer as well.
The question/exercise should be easy and designed to test the user's Python understanding.
Keep the homework brief and user-friendly. Format the answer as JSON with keys: question, expected_answer, hints.
Here is the last question: {user_message}"""

    try:
        assignment_response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            json={
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": assignment_prompt}],
                "temperature": 0.3  # Lower temperature for consistent JSON
            }
        )
        assignment_response.raise_for_status()
        response_content = assignment_response.json()["choices"][0]["message"]["content"]
        return json.loads(response_content)  # Parse JSON response

    except (requests.exceptions.RequestException, json.JSONDecodeError) as e:
        logging.error(f"Assignment generation failed: {e}")
        return None

@app.post("/ask")
async def ask_question(message_data: Message):
    try:
        if not message_data.apiKey.strip():
            raise HTTPException(status_code=400, detail="API Key is required")

        # Prepare prompt for AI model
        prompt = f"""You are a helpful Python programming tutor. You are currently tutoring a child.
Be encouraging. Use simple language. If they ask for help, break down your answer into small parts.
If they ask how to do something, provide examples.

You will respond according to your tutor persona: {message_data.tutor}.

User question: {message_data.message}"""

        # Get main response from OpenAI API
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {message_data.apiKey}", "Content-Type": "application/json"},
            json={
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7
            }
        )
        response.raise_for_status()

        ai_response = response.json()["choices"][0]["message"]["content"]
        assignment = None

        # Generate assignment every 3rd message
        if message_data.message_count % 3 == 0:
            assignment = generate_assignment(message_data.message, message_data.apiKey)

        return {"response": ai_response, "assignment": assignment}

    except requests.exceptions.RequestException as e:
        logging.error(f"API request failed: {e}")
        raise HTTPException(status_code=500, detail="AI service unavailable")
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
