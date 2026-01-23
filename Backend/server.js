import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./configs/db.js";

import userRouter from "./routes/userRouter.js";
import chatRoutes from "./routes/chatRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import liabilityRoutes from "./routes/liabilityRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

await connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is Working 🚀");
});

app.use("/api/user", userRouter);
app.use("/api/chat", chatRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/liabilities", liabilityRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/feedback", feedbackRoutes);


// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
