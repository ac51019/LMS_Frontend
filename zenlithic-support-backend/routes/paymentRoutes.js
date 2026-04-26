import express from "express";
import Payment from "../models/Payment.js";
import Course from "../models/Course.js";

const router = express.Router();

// Create payment intent (mock - in production use Stripe)
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { courseId, amount, currency } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    
    // In production, this would create a real Stripe payment intent
    // For now, we return a mock client secret
    const mockClientSecret = `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`;
    
    res.json({
      success: true,
      clientSecret: mockClientSecret,
      amount: amount,
      currency: currency || "INR",
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Confirm payment
router.post("/confirm", async (req, res) => {
  try {
    const { userId, courseId, paymentId, amount } = req.body;
    
    // Create payment record
    const payment = new Payment({
      user: userId,
      course: courseId,
      amount,
      status: "completed",
      paymentId: paymentId || `pay_${Date.now()}`,
    });
    
    await payment.save();
    
    // Enroll user in course
    const course = await Course.findById(courseId);
    if (course && !course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }
    
    res.json({ success: true, data: payment });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get payment history for user
router.get("/user/:userId", async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.userId })
      .populate("course", "title thumbnail")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("user", "name email")
      .populate("course", "title");
    
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    
    res.json({ success: true, data: payment });
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;