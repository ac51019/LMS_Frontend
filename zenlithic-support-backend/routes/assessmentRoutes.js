import express from "express";
import Assessment from "../models/Assessment.js";

const router = express.Router();

// Get assessments for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.params.userId })
      .populate("course", "title")
      .sort({ attemptedAt: -1 });
    res.json({ success: true, data: assessments });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get assessments for a course
router.get("/course/:courseId", async (req, res) => {
  try {
    const assessments = await Assessment.find({ course: req.params.courseId })
      .populate("user", "name email");
    res.json({ success: true, data: assessments });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Submit assessment
router.post("/add/:userId/:courseId", async (req, res) => {
  try {
    const { marks, totalMarks } = req.body;
    const passingMarks = (totalMarks || 100) * 0.4; // 40% passing criteria
    
    const assessment = new Assessment({
      user: req.params.userId,
      course: req.params.courseId,
      marks,
      totalMarks: totalMarks || 100,
      passed: marks >= passingMarks,
    });
    
    await assessment.save();
    res.status(201).json({ success: true, data: assessment });
  } catch (error) {
    console.error("Error submitting assessment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get specific assessment
router.get("/:userId/:courseId", async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      user: req.params.userId,
      course: req.params.courseId,
    }).populate("course", "title");
    
    res.json({ success: true, data: assessment });
  } catch (error) {
    console.error("Error fetching assessment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;