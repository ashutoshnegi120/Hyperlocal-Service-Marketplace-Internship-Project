import express from "express";
const router = express.Router();

import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  logoutUser,
  resendVerification,
  verifyEmailOTP,
  forgotPassword,
  verifyResetOTP,
} from "../controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify-email", verifyEmailOTP);
router.post("/resend-verification", resendVerification);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOTP);

export default router;
