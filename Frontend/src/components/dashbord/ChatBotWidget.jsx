import React, { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hi! I’m FinSage Assistant. Ask me about your income, assets, liabilities, or recommendations.",
    },
  ]);

  const listRef = useRef(null);

  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    });
  }, [open, messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const sendMessage = async () => {
    if (!canSend) return;

    const userText = input.trim();
    setInput("");
    setLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    // Add typing message
    const typingId = crypto.randomUUID();
    setMessages((prev) => [...prev, { id: typingId, role: "bot", text: "Typing..." }]);

    try {
      const res = await fetch(`${API_BASE}/api/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Server error");
      }

      // Your backend response format: { success: true, data: { response: "..." } }
      const botText = data?.data?.response || "No response received.";

      // Replace typing message with real response
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId ? { ...m, text: botText } : m
        )
      );
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? { ...m, text: `Server not reachable. ${err.message}` }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-2xl bg-[#EF8354] text-white shadow-lg
                   hover:opacity-95 transition flex items-center justify-center
                   ring-4 ring-[#EF8354]/20"
        aria-label="Open Chatbot"
        title="Chat"
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[92vw] overflow-hidden rounded-3xl border border-[#BFC0C0]/60 bg-white shadow-2xl">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#BFC0C0]/40 bg-gradient-to-r from-[#EF8354]/15 via-white to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[#EF8354] text-white flex items-center justify-center shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div className="leading-tight">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#040303]">
                      FinSage Assistant
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#040303]/60">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-[#040303]/55">
                    Smart help • Fast answers
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="h-10 w-10 rounded-2xl hover:bg-black/5 transition flex items-center justify-center"
                aria-label="Close Chatbot"
                title="Close"
              >
                <X className="h-4 w-4 text-[#040303]" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="h-[380px] overflow-auto px-4 py-4 bg-gradient-to-b from-white to-[#BFC0C0]/10"
          >
            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id || idx}
                  className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-3xl px-4 py-2.5 text-sm leading-relaxed shadow-sm
                      ${
                        isUser
                          ? "bg-[#EF8354] text-white rounded-br-xl"
                          : "bg-white text-[#040303] border border-[#BFC0C0]/40 rounded-bl-xl"
                      }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#BFC0C0]/40 bg-white">
            <div className="flex items-end gap-2">
              <div className="flex-1 rounded-2xl border border-[#BFC0C0]/60 bg-white px-3 py-2 focus-within:border-[#EF8354] focus-within:ring-4 focus-within:ring-[#EF8354]/15 transition">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type a message…"
                  rows={1}
                  className="w-full resize-none bg-transparent text-sm outline-none text-[#040303] placeholder:text-[#040303]/45"
                />
                <p className="mt-1 text-[10px] text-[#040303]/45">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>

              <button
                onClick={sendMessage}
                disabled={!canSend}
                className={`h-11 w-11 rounded-2xl flex items-center justify-center transition shadow-sm
                  ${
                    canSend
                      ? "bg-[#EF8354] text-white hover:opacity-95"
                      : "bg-[#BFC0C0]/40 text-[#040303]/40 cursor-not-allowed"
                  }`}
                aria-label="Send"
                title="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {loading && (
              <p className="mt-2 text-[11px] text-[#040303]/50">
                FinSage Assistant is thinking...
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
