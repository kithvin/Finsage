import Chat from "../models/Chat.js";

class ContextService {
  /**
   * Retrieves recent chat history to provide AI context
   */
  async getContext(systemUser = "FinSageAI", limit = 5) {
    try {
      // Fetch recent messages (latest first)
      const history = await Chat.find({})
        .sort({ createdAt: -1 })
        .limit(limit);

      // Convert to chronological order
      const chronologicalHistory = history.reverse();

      if (chronologicalHistory.length === 0) {
        return "No previous conversation history.";
      }

      // Format history for AI
      const contextString = chronologicalHistory
        .map(
          (chat) => `User: ${chat.message}\nBot: ${chat.response}`
        )
        .join("\n\n");

      return contextString;
    } catch (error) {
      console.error("Error retrieving context:", error);
      return "";
    }
  }
}

const contextService = new ContextService();
export default contextService;
