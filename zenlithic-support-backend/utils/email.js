import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.smtp_host || "smtp.gmail.com",
  port: process.env.smtp_port || 587,
  secure: process.env.smtp_secure === "true", // true for 465, false for other ports
  auth: {
    user: process.env.smtp_user,
    pass: process.env.smtp_pass,
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Zenlithic Support" <${process.env.smtp_user}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
