import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
    host: "Gmail",
    port: 465,
    secure: true, // Use true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (to, otp) => {
    transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Reset your Password",
        html: `
      <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
        <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px; text-align:center;">
          
          <h2 style="color:#333;">Password Reset Request</h2>
          
          <p style="color:#555;">
            We received a request to reset your password. 
            Use the OTP below to reset your password.
          </p>

          <div style="font-size:28px; font-weight:bold; letter-spacing:5px; 
          background:#f1f1f1; padding:15px; border-radius:8px; margin:20px 0;">
            ${otp}
          </div>

          <p style="color:#777; font-size:14px;">
            This OTP will expire in 5 minutes.
          </p>

          <p style="color:#777; font-size:12px;">
            If you didn't request this, you can safely ignore this email.
          </p>

        </div>
      </div>
    `
    })
}

export default sendMail;