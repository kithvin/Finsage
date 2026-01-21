import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || "development",

  // Main DB (FinSage)
  mongodbUri: process.env.MONGODB_URI,
  mongodbDbName: process.env.MONGODB_DB_NAME || "FinsageDB",

  // Chatbot
  geminiApiKey: process.env.GEMINI_API_KEY_Chatbot,

  // (Optional) if you want separate chatbot db
  chatbotDbName: process.env.CHATBOT_DB_NAME || "ChatbotDB",
};

export default config;
