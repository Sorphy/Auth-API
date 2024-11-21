import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .regex(
        /^[a-zA-Z]+(\s[a-zA-Z]+)+$/,
        "Full name must contain at least two words, each separated by a space, and only letters"
      )
      .transform((value) => value.trim()),
    email: z.string().email("Invalid email format"),
    phone: z.string().regex(/^\d{10,15}$/, "Phone number must be 10-15 digits"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const mfaSchema = z.object({
  email: z.string().email("Invalid email format"),
otp: z
    .number()
    .int()
    .min(100000, "OTP must be exactly 6 digits")
    .max(999999, "OTP must be exactly 6 digits"),
});
