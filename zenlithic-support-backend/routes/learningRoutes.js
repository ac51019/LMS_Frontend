import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

const router = express.Router();

// Get user enrollments
router.get("/:userId", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.params.userId })
      .populate("course")
      .sort({ enrolledAt: -1 });
    res.json({ success: true, data: enrollments });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Enroll in course
router.post("/", async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ success: false, message: "Already enrolled" });
    }
    
    const enrollment = new Enrollment({ user: userId, course: courseId });
    await enrollment.save();
    
    // Also add to course enrolled students
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId },
    });
    
    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate("course");
    
    res.status(201).json({ success: true, data: populatedEnrollment });
  } catch (error) {
    console.error("Error enrolling:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Check if enrolled
router.get("/check/:userId/:courseId", async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      user: req.params.userId,
      course: req.params.courseId,
    });
    
    res.json({ success: true, isEnrolled: !!enrollment });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Unenroll from course
router.delete("/:userId/:courseId", async (req, res) => {
  try {
    await Enrollment.findOneAndDelete({
      user: req.params.userId,
      course: req.params.courseId,
    });
    
    // Also remove from course enrolled students
    await Course.findByIdAndUpdate(req.params.courseId, {
      $pull: { enrolledStudents: req.params.userId },
    });
    
    res.json({ success: true, message: "Unenrolled successfully" });
  } catch (error) {
    console.error("Error unenrolling:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;