import { GoogleGenerativeAI } from '@google/generative-ai';
import "dotenv/config"

const apiKey = process.env.API_KEY;
const genAIKey = new GoogleGenerativeAI(apiKey);
const model = genAIKey.getGenerativeModel(
    { model: 'gemini-1.5-flash' }
);

export const calculateDeliveryStatus = () => {
    let success = Math.random();
    return success >= 0.5 ? "success" : "fail";
};

export const createPersonalizedMessage = async (name, expenditure, visits, campaignMessage) => {
    const prompt =
        `
        You are a helpful marketing assistant. A customer named ${name} has spent ₹${expenditure} over ${visits} visits. The campaign message provided by the marketing manager is: "${campaignMessage}".
        Create a friendly, short, and personalized promotional message (1-2 lines) for ${name}, slightly inspired by the campaign message. Keep it customer-friendly and encouraging. Include ${name}'s name in the message and it should be a personalized message. 
    `;

    try {
        const message = await model.generateContent(prompt);
        const res = message.response.text().trim();
        // console.log(res);
        return res.toString();
    } catch (error) {
        console.log('Error generating personalized message:', error);
        return `Hi ${name}, here’s 10% off on your next order!`;
    }
};
