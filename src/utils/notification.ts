import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASSWORD,
  }
});

export const sendEmail = async (email: string, otp: string): Promise<void> => {
  try {
    const mailOptions = {
      from: 'sofiyyahabidoye@gmail.com',
      to: email,
      subject: "Account Verification OTP",
      html: `
    <p>Your OTP is:</p>
    <h1>${otp}</h1>
    <p>Please enter this OTP to verify your account.</p>
    <p>Note that the OTP is only valid for 5 minutes.</p>
  `,
    };
    await transport.sendMail(mailOptions); // Sending the email
  } catch (error: any) {
    console.error("Error sending OTP:", error.stack || error); // Log the error if sending fails
  }
};
