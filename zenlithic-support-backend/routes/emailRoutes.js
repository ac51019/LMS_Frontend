import express from "express";
import { sendSupportEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/send", sendSupportEmail);

export default router;
