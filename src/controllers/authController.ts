import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP, validateOTP } from "../utils/otpGenerator";
import { sendEmail } from "../utils/notification";
import { users, User } from "../utils/users";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone, password, confirmPassword } = req.body;
    
    const savedEmail = email.toLowerCase();
  if (password !== confirmPassword) {
    res.status(400).json({ message: "Passwords do not match!" });
    return;
    }
    const userExists = users.find(
      (user) => user.email === savedEmail || user.phone === phone
    );
    if (userExists) {
      res
        .status(409)
        .json({ message: "User with this email or phone already exists!" });
      return;
    }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { name, email, phone, password: hashedPassword };
  users.push(user);

  console.log("New User Added:", user);
  console.log("Current Users Array:", users);
  res.status(201).json({ message: "User registered successfully!" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const userIndex = users.findIndex((user) => user.email === email);
  if (
    userIndex === -1 ||
    !(await bcrypt.compare(password, users[userIndex].password))
  ) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
  const otpDetails = generateOTP();
  users[userIndex].otp = otpDetails.otp;
  users[userIndex].otpExpiry = otpDetails.otp_expiry;

  console.log("Generated OTP:", otpDetails.otp);
  console.log("User after assigning OTP:", users[userIndex]);

  try {
    await sendEmail(email, otpDetails.otp.toString());
    res.status(200).json({ message: "OTP sent to your email. Please verify" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send OTP email" });
  }
};

export const verifyMFA = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  console.log("Verification Request:", { email, otp });

  try {
    const user = validateOTP(email, Number(otp));
    if (!user) {
      res.status(401).json({ message: "Invalid OTP" });
      return;
    }
    user.otp = undefined;
    user.otpExpiry = undefined;

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Authentication successful", token });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else {
      console.error("Error verifying MFA:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
