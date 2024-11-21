import express from "express";
import { validate } from "../middlewares/validateInput";
import { register, login, verifyMFA } from "../controllers/authController";
import { signupSchema, loginSchema, mfaSchema } from "../schemas/authSchemas";

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user by providing name, email, phone, password, and confirmPassword.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Passwords do not match
 */
router.post("/signup", validate(signupSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in an existing user
 *     description: Logs in the user by verifying their email and password, and sends an OTP for MFA.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to the user's email
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", validate(loginSchema), login);

/**
 * @swagger
 * /api/auth/verify-mfa:
 *   post:
 *     summary: Verify OTP for MFA
 *     description: Verifies the OTP sent to the user's email to complete the login process.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful, token returned
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid OTP
 */
router.post("/verify-mfa", validate(mfaSchema), verifyMFA);

export default router;
