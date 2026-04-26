import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// Get questions for a course
router.get("/course/:courseId", async (req, res) => {
  try {
    const questions = await Question.find({ course: req.params.courseId });
    res.json({ success: true, data: questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Add question
router.post("/", async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update question
router.put("/:id", async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    
    res.json({ success: true, data: question });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete question
router.delete("/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Question deleted" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;