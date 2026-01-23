import Chat from "../models/Chat.js";

class ContextService {
  /**
   * Retrieves recent chat history to provide AI context
   */
  async getContext(systemUser = "FinSageAI", limit = 5) {
    try {
      // Fetch recent messages (latest first) from the database
      const history = await Chat.find({})
        .sort({ createdAt: -1 })
        .limit(limit);

      // Reverse the order to make the history chronological
      const chronologicalHistory = history.reverse();

      // Return a default message if no history is found
      if (chronologicalHistory.length === 0) {
        return "No previous conversation history.";
      }

      // Format the chat history into a string suitable for AI context
      const contextString = chronologicalHistory
        .map(
          (chat) => `User: ${chat.message}\nBot: ${chat.response}`
        )
        .join("\n\n");

      return contextString;
    } catch (error) {
      // Log any errors that occur during the process
      console.error("Error retrieving context:", error);
      return "";
    }
  }
}

const contextService = new ContextService();
export default contextService;
