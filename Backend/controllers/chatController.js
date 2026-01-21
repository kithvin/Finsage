import Chat from "../models/Chat.js";
import contextService from "../services/contextService.js";
import geminiService from "../services/geminiService.js";

const chatController = {
  /**
   * POST /api/chat/message
   * body: { message: string }
   */
  processMessage: async (req, res) => {
    try {
      const { message } = req.body;
      const userId = "anonymous"; // you can replace later with real user id

      if (!message) {
        return res.status(400).json({ success: false, error: "Message is required" });
      }

      // 1) Retrieve Context (Global)
      const context = await contextService.getContext();

      // 2) Generate Response using Gemini
      const responseText = await geminiService.generateResponse(message, context);

      // 3) Save to Database
      const chat = await Chat.create({
        user: userId,
        message,
        response: responseText,
      });

      return res.status(201).json({
        success: true,
        data: chat,
      });
    } catch (error) {
      console.error("Error processing message:", error);
      return res.status(500).json({
        success: false,
        error: error?.message || "Server error",
      });
    }
  },
};

export default chatController;
