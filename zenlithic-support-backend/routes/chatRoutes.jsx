import express from "express";
import { sendMessage } from "../controllers/chatController.jsx";
import Chat from "../models/Chat.jsx";  

const router = express.Router();
// user chat
router.post("/chat", sendMessage);

// admin view chats
router.get("/admin/chats", async (req, res) => {
  const chats = await Chat.find().sort({ createdAt: -1 });
  res.json(chats);
});

export default router;