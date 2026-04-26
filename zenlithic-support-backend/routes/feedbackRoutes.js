import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// Get feedbacks for a course
router.get("/:courseId", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ course: req.params.courseId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Post feedback
router.post("/", async (req, res) => {
  try {
    const { course_id, comment, rating, userId } = req.body;
    
    const feedback = new Feedback({
      course: course_id,
      user: userId,
      comment,
      rating: rating || 5,
    });
    
    await feedback.save();
    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    console.error("Error posting feedback:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete feedback
router.delete("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Feedback deleted" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;