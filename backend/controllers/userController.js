import userModel from "../models/userModel.js";
import { validationResult } from "express-validator";
import {
  createUser,
  findUserByEmail,
  sendVerificationOTP,
  verifyEmailOTP as serviceVerifyEmailOTP,
  sendResetPasswordOTP,
  verifyResetPasswordOTP,
} from "../services/userServices.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, mobile, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);

  try {
    const user = await createUser({ name, mobile, email, password: hashedPassword });

    try {
      await sendVerificationOTP(user);
    } catch (err) {
      console.error("Verification email failed:", err.message);
    }

    const token = user.generateAuthToken();
    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ user: userObj, token, message: "Registered. OTP sent to email." });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "Email is already registered" });
    res.status(500).json({ message: err.message || "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
  });

  const userObj = user.toObject();
  delete userObj.password;

  res.status(200).json({ user: userObj, token });
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const resendVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.isVerified) return res.status(400).json({ message: "User already verified" });

  await sendVerificationOTP(user);
  res.status(200).json({ message: "OTP resent successfully" });
};

export const verifyEmailOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await serviceVerifyEmailOTP(email, otp);
    const userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({ message: "Email verified", user: userObj });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    await sendResetPasswordOTP(email);
    res.status(200).json({ message: "Reset OTP sent to email" });
  } catch (err) {
    // Handle wrong email here
    res.status(404).json({ message: err.message });
  }
};


export const verifyResetOTP = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await verifyResetPasswordOTP(email, otp, newPassword);
    const userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({ message: "Password reset successful", user: userObj });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  resendVerification,
  verifyEmailOTP,
  forgotPassword,
  verifyResetOTP,
};
