"use client"

import { type KeyboardEvent, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  text: string
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Hello! I am the UCCZ AI Assistant. Ask me about events, membership, councils, or church services.",
  },
]

export default function UcczChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState("")
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue("")
    setIsSending(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Chat service error")
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.message,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          text: "Sorry, I couldn't connect to the AI service. Please try again later.",
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-full min-h-[26rem] flex-col gap-4">
      <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="UCCZ logo" className="h-11 w-11 rounded-2xl object-cover" />
          <div>
            <p className="text-sm font-semibold text-slate-950" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              UCCZ AI Chat
            </p>
            <p className="text-sm text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Ask a question and I’ll answer from UCCZ info.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="max-h-[44vh] overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <div key={message.id} className={`mb-4 max-w-[95%] ${message.role === "user" ? "ml-auto text-right" : "mr-auto text-left"}`}>
              <div
                className={`inline-block rounded-3xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-900"
                }`}
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-4 py-4">
          <label htmlFor="uccz-chat-input" className="sr-only">
            Type your message
          </label>
          <Textarea
            id="uccz-chat-input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about UCCZ events, membership, or church activities"
            className="min-h-[5rem]"
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Press Enter to send. Shift+Enter for a new line.
            </span>
            <Button onClick={sendMessage} disabled={isSending || !inputValue.trim()}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
