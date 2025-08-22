
import { GoogleGenAI, Type } from "@google/genai";
import { YoutubeData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const videoSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A short, unique alphanumeric string." },
        title: { type: Type.STRING, description: "A plausible, engaging YouTube video title." },
        channel: { type: Type.STRING, description: "A plausible YouTube channel name." },
        views: { type: Type.STRING, description: "A string representing the view count (e.g., '1.2M views')." },
        uploadDate: { type: Type.STRING, description: "A string representing upload date (e.g., '3 weeks ago')." },
        duration: { type: Type.STRING, description: "A string in MM:SS or HH:MM:SS format." },
        summary: { type: Type.STRING, description: "A dense, professional, 2-3 sentence summary." },
        keyMoments: {
            type: Type.ARRAY,
            description: "An array of 3-5 key moments in the video.",
            items: {
                type: Type.OBJECT,
                properties: {
                    timestamp: { type: Type.STRING, description: "Timestamp in MM:SS format." },
                    description: { type: Type.STRING, description: "A short description of the moment." },
                },
                required: ["timestamp", "description"],
            },
        },
    },
    required: ["id", "title", "channel", "views", "uploadDate", "duration", "summary", "keyMoments"],
};

const shortSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A short, unique alphanumeric string." },
        title: { type: Type.STRING, description: "A plausible, engaging YouTube Short title." },
        channel: { type: Type.STRING, description: "A plausible YouTube channel name." },
        views: { type: Type.STRING, description: "A string representing the view count (e.g., '500K views')." },
        summary: { type: Type.STRING, description: "A very brief, one-sentence summary." },
    },
    required: ["id", "title", "channel", "views", "summary"],
};

export const fetchYouTubeData = async (topic: string): Promise<YoutubeData> => {
    try {
        const prompt = `You are a YouTube search API simulator. Your purpose is to generate realistic, but fictional, YouTube video search results based on a user's topic. You must respond with a valid JSON object. Do not include any text before or after the JSON object.

The user's topic is: "${topic}"

Generate 12 video results and 4 short video results. The content should be diverse and relevant to the user's topic.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        videos: {
                            type: Type.ARRAY,
                            items: videoSchema,
                        },
                        shorts: {
                            type: Type.ARRAY,
                            items: shortSchema,
                        },
                    },
                    required: ["videos", "shorts"],
                },
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error fetching data from Gemini API:", error);
        throw new Error("Failed to generate video data. Please try again.");
    }
};
