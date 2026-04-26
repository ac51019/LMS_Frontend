import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    default: 100,
  },
  passed: {
    type: Boolean,
    default: false,
  },
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Assessment", assessmentSchema);