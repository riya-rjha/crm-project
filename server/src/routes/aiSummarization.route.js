import express from "express";
import { GoogleGenerativeAI } from '@google/generative-ai';
import "dotenv/config";

const apiKey = process.env.API_KEY;
const genAIKey = new GoogleGenerativeAI(apiKey);
const model = genAIKey.getGenerativeModel({ model: 'gemini-1.5-flash' });

const router = express.Router();

router.post('/', async (req, res) => {
    const { size, sent, fail } = req.body;

    const prompt =
        `
        Generate a human-readable insight summary of 4-5 lines such as this "Your campaign reached 1284 users. Customers with > ₹10K spend had a 95% delivery rate." Use the ${size} as the number of users and a message with the total customers who successfully received the ${sent} number of messages, and the ones who weren't able to receive ${fail}. Generate a summary that depicts a visuaization of the given dat.
    `;

    try {
        const response = await model.generateContent(prompt);
        const text = response.response.text().trim();
        res.status(200).json({ summary: text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
