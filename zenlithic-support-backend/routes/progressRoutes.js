import express from "express";
import Progress from "../models/Progress.js";

const router = express.Router();

// Get user progress for a course
router.get("/:userId/:courseId", async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.params.userId,
      course: req.params.courseId,
    });
    res.json({ success: true, data: progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update progress
router.put("/update-progress", async (req, res) => {
  try {
    const { userId, courseId, playedTime, duration } = req.body;
    
    const progress = await Progress.findOneAndUpdate(
      { user: userId, course: courseId },
      {
        watchedDuration: playedTime,
        totalDuration: duration,
        lastAccessed: Date.now(),
      },
      { new: true, upsert: true }
    );
    
    res.json({ success: true, data: progress });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update duration
router.put("/update-duration", async (req, res) => {
  try {
    const { userId, courseId, duration } = req.body;
    
    const progress = await Progress.findOneAndUpdate(
      { user: userId, course: courseId },
      {
        totalDuration: duration,
        lastAccessed: Date.now(),
      },
      { new: true, upsert: true }
    );
    
    res.json({ success: true, data: progress });
  } catch (error) {
    console.error("Error updating duration:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Mark lesson as completed
router.put("/complete-lesson", async (req, res) => {
  try {
    const { userId, courseId, lessonId } = req.body;
    
    const progress = await Progress.findOneAndUpdate(
      { user: userId, course: courseId },
      {
        $addToSet: { completedLessons: lessonId },
        lastAccessed: Date.now(),
      },
      { new: true, upsert: true }
    );
    
    res.json({ success: true, data: progress });
  } catch (error) {
    console.error("Error marking lesson complete:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all progress for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.params.userId })
      .populate("course", "title thumbnail");
    res.json({ success: true, data: progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;