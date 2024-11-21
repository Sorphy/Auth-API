import { users, User } from "./users";

export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otp_expiry = new Date();

  otp_expiry.setTime(new Date().getTime() + 5 * 60 * 1000);

  return { otp, otp_expiry };
};

export const validateOTP = (email: string, otp: number): User | null => {
  const user = users.find((user) => user.email === email);
  console.log("Validating OTP for user:", user);
  console.log("Expected OTP:", user?.otp, "Received OTP:", otp);

  if (!user || user.otp !== otp) return null;
  console.log("OTP Expiry:", user.otpExpiry, "Current Time:", new Date());
  if (!user.otpExpiry || new Date() > user.otpExpiry) {
    throw new Error("OTP has expired");
  }

  return user;
};
