from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.post("/api/ai/chat")
def chat():
    user_input = request.json.get("message", "").lower()

    # Simple multilingual mock logic
    if "hola" in user_input:
        reply = "Hola! In English, you can say 'Hello'."
    elif "bonjour" in user_input:
        reply = "Bonjour! In English, you can say 'Hello'."
    elif "hello" in user_input:
        reply = "Hello! How can I help you learn today?"
    else:
        reply = (
            "I'm your AI language assistant. "
            "Try greeting me in another language!"
        )

    return jsonify({
        "reply": reply,
        "mode": "mock-ai"
    })

@app.get("/")
def health():
    return {"status": "AI service running (mock mode)"}

# if __name__ == "__main__":
#     app.run(port=8000, debug=True)
