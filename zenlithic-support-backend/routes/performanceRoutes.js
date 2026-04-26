import express from "express";
import Assessment from "../models/Assessment.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

const router = express.Router();

// Get user performance data
router.get("/performance/:userId", async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.params.userId })
      .populate("course", "title")
      .sort({ attemptedAt: -1 });
    
    const totalAssessments = assessments.length;
    const passedAssessments = assessments.filter(a => a.passed).length;
    const averageMarks = assessments.length > 0
      ? assessments.reduce((sum, a) => sum + (a.marks / a.totalMarks * 100), 0) / totalAssessments
      : 0;
    
    res.json({
      success: true,
      data: {
        assessments,
        totalAssessments,
        passedAssessments,
        averageMarks: Math.round(averageMarks * 100) / 100,
      },
    });
  } catch (error) {
    console.error("Error fetching performance:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get certificate for course (if passed)
router.get("/:courseId", async (req, res) => {
  try {
    const { userId } = req.query;
    
    const assessment = await Assessment.findOne({
      user: userId,
      course: req.params.courseId,
      passed: true,
    }).populate("course", "title");
    
    if (!assessment) {
      return res.status(404).json({ success: false, message: "Certificate not found. You need to pass the assessment first." });
    }
    
    const user = await User.findById(userId);
    
    res.json({
      success: true,
      data: {
        userName: user.name,
        courseName: assessment.course.title,
        marks: assessment.marks,
        totalMarks: assessment.totalMarks,
        date: assessment.attemptedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;