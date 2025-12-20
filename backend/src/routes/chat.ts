import express from "express";
import { auth } from "../middleware/auth";
import { sendMessage, getSessionHistory, getChatHistory, getChatSession, createChatSession, getAllChatSessions } from "../controllers/chat";

const router = express.Router();

router.use(auth);

router.post("/sessions", createChatSession);

router.get("/sessions", getAllChatSessions);

router.get("/sessions/:sessionId", getChatSession);

router.post("/sessions/:sessionId/messages", sendMessage);

router.get("/sessions/:sessionId/history", getChatHistory);

export default router;