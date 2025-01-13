'use server'

const MAX_CONTENT_LENGTH = 500;

export async function getChatCompletion(prompt: string): Promise<any> {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured in .env");
  }

  const url = "https://api.groq.com/openai/v1/chat/completions";

  const normalizedPrompt = prompt.trim().replace(/\s+/g, ' ');

  const trimmedPrompt = normalizedPrompt.slice(0, MAX_CONTENT_LENGTH);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: trimmedPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error when calling GROQ API:", error.message);
    throw new Error("Error when calling GROQ API");
  }
}
