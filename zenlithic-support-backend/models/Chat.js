import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userName: String,
  message: String,
  status: {
    type: String,
    enum: ["active", "pending", "closed"],
    default: "active"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Chat", chatSchema);