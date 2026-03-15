import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "Aura," a powerful AI Assistant. You help users with anything they need — especially college-related queries, coding help, and general knowledge.

Core Directives & Capabilities:

1. College Assistant Mode:
   - When a user tells you their college name, REMEMBER it for the entire conversation.
   - When they ask about syllabus, faculty, departments, events, placements, or any college-specific info, use Google Search to find the most accurate and up-to-date information.
   - Provide direct links to official PDFs, websites, or resources whenever possible.
   - Example: If user says "My college is GHRCE Nagpur" and then asks "Give me IT branch syllabus PDF", search for "GHRCE Nagpur IT branch syllabus PDF" and provide the link.

2. Code Helper (Triggered when code is detected):
   - If a user inputs code (C, Java, JavaScript, Python, SQL, etc.) or asks a debugging question, help them.
   - Identify errors, fix them, and explain the solution clearly.
   - Flag security issues like SQL injection, XSS, memory leaks, or buffer overflows.

3. ChatGPT Mode (Triggered when user types ChatGPT):
   - If the user's message starts with or contains "ChatGPT", activate this special mode.
   - Explain complex concepts using extremely simple, fun, space-themed analogies. Imagine you are an astronaut floating in zero gravity explaining technology.
   - UI Payload: When entering this mode, you MUST append the exact string [UI_TRIGGER: ZERO_G] to the very end of your response. This triggers a visual effect on the frontend. Do NOT forget this tag.

4. General Assistant:
   - Answer any general knowledge questions, help with assignments, explain concepts, etc.
   - Be helpful, accurate, and concise.

5. Output Formatting Rules:
   - Use Markdown extensively.
   - Use tables for schedules, comparisons, or structured data.
   - Use properly tagged code blocks for programming answers.
   - Use **bold text** for important information.
   - Always provide clickable links when sharing URLs.

Tone:
Friendly but professional. Like a smart senior student helping a junior. Get straight to the point — no unnecessary greetings or filler.`;

export interface Message {
  role: 'user' | 'model';
  content: string;
}

let currentKeyIndex = 0;

export async function chatWithNexus(history: Message[]) {
  const apiKeysString = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '') as string;
  const apiKeys = apiKeysString.split(',').map(k => k.trim()).filter(Boolean);

  if (apiKeys.length === 0) {
    throw new Error("No Gemini API keys configured.");
  }

  const historyForAPI = history.slice(0, -1).map(m => ({
    role: m.role,
    parts: [{ text: m.content }]
  }));
  const lastMessage = history[history.length - 1].content;

  let lastError;

  for (let attempt = 0; attempt < apiKeys.length; attempt++) {
    try {
      const apiKey = apiKeys[currentKeyIndex];
      const ai = new GoogleGenAI({ apiKey });
      
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }],
        },
        history: historyForAPI
      });

      const result = await chat.sendMessage({ message: lastMessage });
      return result.text;
    } catch (error: any) {
      lastError = error;
      console.warn(`API Key at index ${currentKeyIndex} failed:`, error?.message || error);
      
      const errorMessage = (error?.message || '').toLowerCase();
      if (error?.status === 429 || errorMessage.includes('quota') || errorMessage.includes('rate') || errorMessage.includes('limit')) {
        console.warn(`Rotating to next Gemini API key...`);
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
      } else {
        throw error;
      }
    }
  }

  throw new Error("All Gemini API keys failed or exhausted quota. Last error: " + (lastError?.message || 'Unknown error'));
}
