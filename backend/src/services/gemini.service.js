const { GoogleGenAI } = require('@google/genai');

// Initialize the GenAI SDK with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are a highly empathetic, professional, and supportive AI mental health assistant. 
Your primary goal is to listen actively, validate the user's feelings, and provide gentle guidance or grounding exercises when appropriate. 
Do not provide medical diagnoses or replace professional therapy. If a user indicates they are in immediate danger or experiencing a crisis, 
strongly urge them to contact emergency services or a crisis hotline immediately. Keep responses relatively concise and conversational.`;

/**
 * Sends a message and the conversation history to Gemini and retrieves the response.
 * @param {Array} history - Array of previous messages in the format [{role: 'user', parts: [{text: '...'}]}, {role: 'model', parts: [{text: '...'}]}]
 * @param {String} newMessage - The latest message from the user
 * @returns {String} - The text response from Gemini
 */
const getGeminiResponse = async (history, newMessage) => {
    try {
        // We use gemini-2.5-flash as the default model for text chat (fast and high quality)
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                ...history,
                {
                    role: 'user',
                    parts: [{ text: newMessage }],
                },
            ],
            config: {
                systemInstruction: {
                    role: 'system',
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                temperature: 0.7, // Slightly higher temperature for more natural, empathetic responses
            },
        });

        return response.text;
    } catch (error) {
        console.error('Error in Gemini Service:', error);
        throw new Error('Failed to communicate with AI service over the network.');
    }
};

module.exports = {
    getGeminiResponse,
};
