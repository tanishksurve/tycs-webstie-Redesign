import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PORT = 3001;
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// --- Initialize Google AI Client ---
if (!process.env.GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not defined in your .env file.");
}
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// --- Global Chat Session (Memory) ---
let chatSession;

app.post('/chat', upload.single('image'), async (req, res) => {
    const userQuestion = req.body.question?.trim() || "";
    const imageFile = req.file;

    console.log(`\n--- NEW REQUEST ---`);
    console.log(`Text: "${userQuestion}" | Image: ${imageFile ? "Yes" : "No"}`);

    if (!userQuestion && !imageFile) {
        return res.status(400).json({ error: 'Please send a message or an image.' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Start chat session with memory only once
        if (!chatSession) {
            chatSession = await model.startChat({
                history: [
                    {
                        role: 'user',
                        parts: [{ text: "Hello!" }]
                    },
                    {
                        role: 'model',
                        parts: [{ text: "Hi! How can I help you today?" }]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 100, // ≈ 30 words
                    temperature: 0.5,
                    topK: 20,
                    topP: 0.8
                }
            });
        }

        // Create prompt
        const shortInstruction = "Please answer in 2–3 short, clear sentences. Limit to 30 words. Be helpful, simple, and stay on topic.";
        const promptParts = [
            { text: `${shortInstruction}\n\n${userQuestion}` }
        ];

        if (imageFile) {
            promptParts.push({
                inlineData: {
                    data: imageFile.buffer.toString("base64"),
                    mimeType: imageFile.mimetype
                }
            });
        }

        const response = await chatSession.sendMessage(promptParts); // ✅ THIS LINE

        const answer = response.response.text();
        console.log("✅ AI Response:", answer);
        res.json({ answer });

    } catch (error) {
        console.error("❌ AI Error:", error);
        res.status(500).json({ error: 'AI service failed. See server logs for details.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
