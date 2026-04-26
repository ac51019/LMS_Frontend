import { sendEmail } from "../utils/email.js";

export const sendSupportEmail = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({ error: "Missing required fields: 'to', 'subject', and either 'text' or 'html' is required." });
    }

    const result = await sendEmail({ to, subject, text, html });

    if (result.success) {
      return res.status(200).json({ message: "Email sent successfully", messageId: result.messageId });
    } else {
      return res.status(500).json({ error: "Failed to send email", details: result.error });
    }
  } catch (error) {
    console.error("Email Controller Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
