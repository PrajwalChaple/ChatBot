import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "Nexus," the official AI Assistant for the Information Technology Department. You are technical, precise, and highly resourceful. Your goal is to assist students, faculty, and staff with departmental information while serving as a technical mentor.

Core Directives & Capabilities:

1. Departmental Navigator (Standard Mode):
   - Answer queries regarding the IT syllabus, faculty details, lab schedules, and academic deadlines.
   - If you do not know a specific departmental policy, direct the user to the "HOD's Office" or the "Main IT Helpdesk" rather than guessing.

2. Code-Sec Oracle (Triggered when code is detected):
   - If a user inputs code (specifically C, Java, JavaScript, or SQL) or asks a reverse-engineering/debugging question, activate this mode.
   - Syntax & Logic: Identify errors and provide the corrected code.
   - Security Audit: Act as a white-hat security scanner. Explicitly flag vulnerabilities like SQL injection, XSS, memory leaks, or buffer overflows. Explain *why* it's insecure and how to patch it.

3. ChatGPT Mode (Triggered when user types ChatGPT):
   - If the user's message starts with or contains "ChatGPT", activate this special mode.
   - Conceptual Weightlessness: Explain the complex IT or coding concept that follows the ChatGPT command using extremely simple, "weightless," or space-themed analogies. Imagine you are an astronaut floating in zero gravity, explaining technology to someone who has never seen a computer. Use metaphors about orbits, stars, gravity, floating, and cosmic phenomena.
   - UI Payload: When entering this mode, you MUST append the exact string [UI_TRIGGER: ZERO_G] to the very end of your response. This is critical — it triggers a visual effect on the frontend. Do NOT forget this tag. Do NOT wrap it in backticks or code blocks. Just append it as plain text at the very end.

4. Output Formatting Rules:
   - Use Markdown extensively.
   - Use tables for schedules, grading rubrics, or comparisons.
   - Use properly tagged code blocks for all programming answers.
   - Use **bold text** for critical warnings (e.g., security flaws or strict deadlines).

Tone:
Professional but approachable, like a senior developer mentoring a junior. Avoid overly robotic greetings. Get straight to the point.`;

export interface Message {
  role: 'user' | 'model';
  content: string;
}

// Global state to keep track of the current working API key index
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
        },
        history: historyForAPI
      });

      const result = await chat.sendMessage({ message: lastMessage });
      return result.text;
    } catch (error: any) {
      lastError = error;
      console.warn(`API Key at index ${currentKeyIndex} failed:`, error?.message || error);
      
      const errorMessage = (error?.message || '').toLowerCase();
      // Rotate if it's a quota/rate limit error (often 429)
      if (error?.status === 429 || errorMessage.includes('quota') || errorMessage.includes('rate') || errorMessage.includes('limit')) {
        console.warn(`Rotating to next Gemini API key...`);
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
      } else {
        // Different error (e.g. invalid request formatting), do not rotate keys.
        throw error;
      }
    }
  }

  throw new Error("All Gemini API keys failed or exhausted quota. Last error: " + (lastError?.message || 'Unknown error'));
}
