import { GoogleGenAI, Type } from "@google/genai";
import { SentimentType } from "../types";

// Lazy client so the landing page still renders when no API key is provided.
let ai: GoogleGenAI | null = null;

const getApiKey = () =>
  // Prefer Vite-style env var, but keep a fallback for the original name.
  import.meta.env.VITE_GEMINI_API_KEY || (globalThis as any)?.process?.env?.API_KEY;

const getClient = () => {
  if (ai) return ai;

  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn(
      "Gemini API key missing. Set VITE_GEMINI_API_KEY (preferred) or API_KEY in a .env file to enable live analysis."
    );
    throw new Error("Missing Gemini API key");
  }

  ai = new GoogleGenAI({ apiKey });
  return ai;
};

export const analyzeSentimentWithGemini = async (text: string): Promise<{
  sentiment: SentimentType;
  score: number;
  reasoning: string;
}> => {
  try {
    const client = getClient();
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the sentiment of the following social media post. 
      Classify as POSITIVE, NEGATIVE, or NEUTRAL. 
      Provide a score from -1.0 (very negative) to 1.0 (very positive).
      Provide a brief reasoning.
      
      Post: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING, enum: ["POSITIVE", "NEGATIVE", "NEUTRAL"] },
            score: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ["sentiment", "score", "reasoning"]
        }
      }
    });

    const jsonText = response.text;
    
    if (!jsonText) {
        throw new Error("Empty response from Gemini");
    }

    const result = JSON.parse(jsonText);
    return {
      sentiment: result.sentiment as SentimentType,
      score: result.score,
      reasoning: result.reasoning
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return { sentiment: 'NEUTRAL', score: 0, reasoning: 'Error during analysis' };
  }
};
