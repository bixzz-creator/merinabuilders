import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error('Failed to initialize GoogleGenAI client:', error);
  }
}

export async function generateChatResponse(
  prompt: string,
  systemInstruction?: string,
  responseMimeType?: string
): Promise<string> {
  if (!ai) {
    throw new Error('Gemini API client not initialized. Missing VITE_GEMINI_API_KEY.');
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || undefined,
        responseMimeType: responseMimeType || undefined,
      },
    });

    if (response && response.text) {
      return response.text.trim();
    }
    throw new Error('Received empty response from Gemini.');
  } catch (error) {
    console.error('Error generating content from Gemini:', error);
    throw error;
  }
}
