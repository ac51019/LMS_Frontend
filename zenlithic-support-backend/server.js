import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import dashboardRoutes from "./routes/deshboardRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import discussionRoutes from "./routes/discussionRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import performanceRoutes from "./routes/performanceRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/discussions", discussionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/certificates", performanceRoutes);

// Health check
app.get("/api/health", (req, res) => {  
  res.json({ success: true, message: "Server is running" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);