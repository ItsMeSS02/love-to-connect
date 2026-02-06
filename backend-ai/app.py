from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = (
    "You are a friendly AI language assistant. "
    "Help users practice languages and explain translations simply."
)

@app.post("/api/ai/chat")
def chat():
    user_message = request.json.get("message", "")

    if not user_message:
        return jsonify({"reply": "Please send a message."}), 400

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        temperature=0.4,
    )

    return jsonify({
        "reply": completion.choices[0].message.content,
        "mode": "groq-direct"
    })


@app.get("/")
def health():
    return {"status": "AI service running (Groq native)"}


if __name__ == "__main__":
    app.run(port=8000, debug=True)
