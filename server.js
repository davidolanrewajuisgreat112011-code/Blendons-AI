const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Check if the API key was loaded
console.log(
    "Gemini API key loaded:",
    !!process.env.GEMINI_API_KEY
);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message;
        console.log("MESSAGE RECEIVED:", message);

        if (!message) {
            return res.status(400).json({
                error: "Please enter a message."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: message
        });

        res.json({
            reply: response.text
        });

    } catch (error) {

        console.error("Gemini error:", error);

        res.status(500).json({
            error: "Blendons AI could not respond."
        });

    }

});

app.listen(PORT, () => {
    console.log(
        `Blendons is running at http://localhost:${PORT}`
    );
});