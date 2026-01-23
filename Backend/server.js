import "dotenv/config"; // Load environment variables
import express from "express"; // Import Express framework
import cookieParser from "cookie-parser"; // Middleware for parsing cookies
import cors from "cors"; // Middleware for enabling CORS
import connectDB from "./configs/db.js"; // Database connection function

// Import route handlers
import userRouter from "./routes/userRouter.js";
import chatRoutes from "./routes/chatRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import liabilityRoutes from "./routes/liabilityRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express(); // Initialize Express app
const port = process.env.PORT || 5000; // Define server port

await connectDB(); // Connect to the database

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies
app.use(
  cors({
    origin: ["http://localhost:3000", "https://finsage-phi.vercel.app"], // Allowed origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("API is Working 🚀"); // Send a simple response
});

// API routes
app.use("/api/user", userRouter); // User-related routes
app.use("/api/chat", chatRoutes); // Chat-related routes
app.use("/api/incomes", incomeRoutes); // Income-related routes
app.use("/api/assets", assetRoutes); // Asset-related routes
app.use("/api/liabilities", liabilityRoutes); // Liability-related routes
app.use("/api/cards", cardRoutes); // Card-related routes
app.use("/api/recommendations", recommendationRoutes); // Recommendation-related routes
app.use("/api/feedback", feedbackRoutes); // Feedback-related routes

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Default status code
  err.status = err.status || "error"; // Default status

  res.status(err.statusCode).json({
    status: err.status, // Error status
    message: err.message, // Error message
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log server start
});
