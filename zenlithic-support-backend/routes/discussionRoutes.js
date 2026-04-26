import express from "express";
import Discussion from "../models/Discussion.js";

const router = express.Router();

// Get discussions for a course
router.get("/:courseId", async (req, res) => {
  try {
    const discussions = await Discussion.find({ course: req.params.courseId })
      .populate("user", "name avatar")
      .sort({ createdAt: 1 });
    res.json({ success: true, data: discussions });
  } catch (error) {
    console.error("Error fetching discussions:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Post a message
router.post("/", async (req, res) => {
  try {
    const { course_id, message, userId, parentMessage } = req.body;
    
    const discussion = new Discussion({
      course: course_id,
      user: userId,
      message,
      parentMessage: parentMessage || null,
    });
    
    await discussion.save();
    const populatedDiscussion = await Discussion.findById(discussion._id)
      .populate("user", "name avatar");
    
    res.status(201).json({ success: true, data: populatedDiscussion });
  } catch (error) {
    console.error("Error posting message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete message
router.delete("/:id", async (req, res) => {
  try {
    await Discussion.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;