import { useState } from "react";

export default function LearnWithAIPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat([...chat, { role: "user", text: message }]);

    const res = await fetch("http://localhost:8000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat((prev) => [
      ...prev,
      { role: "assistant", text: data.reply },
    ]);

    setMessage("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Learn With AI</h1>

      <div className="border p-4 h-64 overflow-y-auto mb-4">
        {chat.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : ""}>
            <p>
              <strong>{msg.role}:</strong> {msg.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Ask in any language..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
}
