import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: String,
  price: {
    type: Number,
    default: 0,
  },
  thumbnail: String,
  duration: String,
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Course", courseSchema);