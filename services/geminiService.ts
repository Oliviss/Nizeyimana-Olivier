
import { GoogleGenAI } from "@google/genai";

export const generateProductDescription = async (productName: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a compelling, creative, and detailed product description for a product named "${productName}". Keep it under 100 words and focus on features and benefits.`,
    });
    return response.text || "Description could not be generated at this time.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Failed to generate AI description.";
  }
};
