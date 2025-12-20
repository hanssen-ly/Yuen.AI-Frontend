import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";
import { inngest } from "../inngest/index";
import { InngestSessionResponse, InngestEvent } from "../types/inngest";
import { User } from "../models/User";
import { Types } from "mongoose";
import { ChatSession, IChatSession, IChatMessage } from "../models/ChatSession";
import { Chat, GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
    apiKey:
        process.env.GEMINI_API_KEY || "AIzaSyCfIC7Y4_eqaE_C5docMRyRDIsSQqjHaNU"
});

export const createChatSession = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const userId = new Types.ObjectId(req.user.id);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const sessionId = uuidv4();

        const session = new ChatSession({
            sessionId,
            userId,
            startTime: new Date(),
            status: "active",
            messages: [],
        });

        await session.save();

        res.status(201).json({
            message: "Chat session created successfully",
            sessionId: session.sessionId,
        });

    }   catch (error) {
        logger.error("Error creating chat session:", error);
        res.status(500).json({
            message: "Error creating chat session:", 
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const { message } = req.body;
        const userId = new Types.ObjectId(req.user.id);

        logger.info("Processing message:", { sessionId, message });
        const session = await ChatSession.findOne({ sessionId, userId });

        if (!session) {
            logger.warn("Session not found:", { sessionId });
            return res.status(404).json({ message: "Session not found" });
        }

        if (session.userId.toString() !== userId.toString()) {
            logger.warn("Unauthorized access attempt:", { sessionId, userId });
            return res.status(403).json({ message: "Unauthorized "});
        }

        const event: InngestEvent = {
            name: 'therapy/session.message',
            data: {
                message,
                history: session.messages,
            },
        };

        logger.info("Sending message to Inngest:", {event});

        await inngest.send(event);

        const analysisPrompt = `Analyze this therapy message and provide insights. Return ONLY a valid JSON object with no markdown formatting or additional text.
        Message: ${message}
        Context: ${JSON.stringify({
            memory: event.data.memory,
            goals:event.data.goals,
        })}
        
        Required JSON structure:
        {
            "emotionalState": "string",
            "themes": ["string"],
            "riskLevel": number,
            "recommendedApproach": "string",
            "progressIndicators": ["string"]
        }`;

        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: analysisPrompt,
        });

        const analysis_res = response.text;
        const analysis = JSON.parse(analysis_res || "{}");

        logger.info("Message analysis:", analysis);

        const responsePrompt = `${event.data.systemPrompt}
        Based on the following context, generate a theraputic response:
        Message: ${message}
        Analysis: ${JSON.stringify(analysis)}
        Memory: ${JSON.stringify(event.data.memory)}
        Goals: ${JSON.stringify(event.data.goals)}

        Provide a response that:
        1. Addresses the immediate emotional needs
        2. Uses appropriate theraputic techniques
        3. Shows empathy and understanding
        4. Maintains professional boundaries
        5. Considers safety and well-being`;

        const responseResult = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: responsePrompt,
        });

        const response_ = responseResult.text;
        logger.info("Generated response:", response);

        session.messages.push({
            role: "user",
            content: message,
            timestamp: new Date(),
          });

        session.messages.push({
            role: "assistant",
            content: response_ || "No response generated",
            timestamp: new Date(),
            metadata: {
                analysis,
                progress: {
                    emotionalState: analysis.emotionalState,
                    riskLevel: analysis.riskLevel,
                },
            },
        });

        await session.save();
        logger.info("Session updated successfully:", { sessionId });

        res.json({
            response, message: response, analysis, metadata:{
                progress:{
                    emotionalState: analysis.emotionalState,
                    riskLevel: analysis.riskLevel,
                },
            },
        });
    } catch (error) {
        logger.error("Error in sendMessage:", error);
        res.status(500).json({
        message: "Error processing message",
        error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const getSessionHistory = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const userId = new Types.ObjectId(req.user.id);

        const session = (await ChatSession.findOne({
            sessionId,
            userId,
        }).exec()) as IChatSession | null;

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (session.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        res.json({
            messages: session.messages,
            startTime: session.startTime,
            status: session.status,
        });

    } catch (error) {
        logger.error("Error fetching session history:", error);
        res.status(500).json({ message: "Error fetching session history" });
    }
};

export const getChatSession = async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      logger.info(`Getting chat session: ${sessionId}`);
      const chatSession = await ChatSession.findOne({ sessionId });
      if (!chatSession) {
        logger.warn(`Chat session not found: ${sessionId}`);
        return res.status(404).json({ error: "Chat session not found" });
      }
      logger.info(`Found chat session: ${sessionId}`);
      res.json(chatSession);
    } catch (error) {
      logger.error("Failed to get chat session:", error);
      res.status(500).json({ error: "Failed to get chat session" });
    }
};

export const getChatHistory = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const userId = new Types.ObjectId(req.user.id);

        const session = await ChatSession.findOne({ sessionId });
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (session.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        res.json(session.messages);
    } catch (error) {
        logger.error("Error fetching chat history:", error);
        res.status(500).json({ message: "Error fetching chat history" });
    }
};

export const getAllChatSessions = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const userId = new Types.ObjectId(req.user.id);

        const sessions = await ChatSession.find({ userId })
            .sort({ updatedAt: -1 })
            .select("sessionId messages createdAt updatedAt")
            .lean();

        res.json(
            sessions.map((session) => ({
                sessionId: session.sessionId,
                messages: session.messages || [],
                createdAt: session.createdAt,
                updatedAt: session.updatedAt,
            }))
        );
    } catch (error) {
        logger.error("Error fetching all chat sessions:", error);
        res.status(500).json({
            message: "Failed to fetch chat sessions",
        });
    }
};
