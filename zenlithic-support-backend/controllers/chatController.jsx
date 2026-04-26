import { OpenAI } from "openai";
import Chat from "../models/Chat.jsx";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are a professional Customer Support Assistant for
ZENLITHIC TECHNOLOGIES PRIVATE LIMITED.

Rules:
- Reply in SAME language as user (Hindi or English).
- Keep answers short and helpful.
- Be polite and professional.
- Ask details for payment/login/refund issues.
`;

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    // OpenAI call
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    // Language detection
    const language = /[अ-ह]/.test(message)
      ? "Hindi"
      : "English";

    // Save chat
    await Chat.create({
      userMessage: message,
      botReply: reply,
      language,
    });

    res.json({ reply });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({
      reply: "Server error. Please try again later.",
    });
  }
};