import { NextResponse } from "next/server"

type ChatRequest = {
  messages: Array<{
    role: "user" | "assistant"
    content: string
  }>
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-pro"

const extractAssistantText = (data: any) => {
  if (!data) return "Sorry, I couldn't generate a response."

  const openaiText = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text
  if (typeof openaiText === "string") return openaiText
  if (Array.isArray(openaiText)) {
    return openaiText
      .map((part) => (typeof part === "string" ? part : part?.text ?? ""))
      .join("")
  }

  const candidateContent = data?.candidates?.[0]?.content
  if (Array.isArray(candidateContent)) {
    return candidateContent
      .map((part: any) => (typeof part === "string" ? part : part?.text ?? ""))
      .join("")
  }

  const candidateText = data?.candidates?.[0]?.content?.text
  if (typeof candidateText === "string") return candidateText

  const partsText = data?.candidates?.[0]?.message?.content?.parts?.[0]
  if (typeof partsText === "string") return partsText

  return "Sorry, I couldn't generate a response."
}

export async function POST(request: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { success: false, message: "Gemini API key is not configured." },
      { status: 500 }
    )
  }

  const body = (await request.json()) as ChatRequest
  const messages = body.messages ?? []

  const payload = {
    model: GEMINI_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are UCCZ AI Assistant for the United Church of Christ in Zimbabwe. Answer user questions about events, membership, councils, church services, and the UCCZ community in a friendly, concise, and accurate way.",
      },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ],
    temperature: 0.7,
    maxOutputTokens: 512,
    candidateCount: 1,
  }

  const response = await fetch(
    `https://gemini.googleapis.com/v1/models/${encodeURIComponent(GEMINI_MODEL)}:generateMessage?key=${encodeURIComponent(
      GEMINI_API_KEY
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Gemini error:", errorText)
    return NextResponse.json(
      { success: false, message: "Gemini request failed." },
      { status: 500 }
    )
  }

  const data = await response.json()
  const assistantText = extractAssistantText(data)

  return NextResponse.json({ success: true, message: assistantText.trim() })
}
