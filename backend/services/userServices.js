import userModel from "../models/userModel.js";
import crypto from "crypto";
import { sendEmail } from "../utils/emailService.js";

// Create a new user
export const createUser = async (data) => {
  const { name, mobile, email, password } = data;

  if (!name || !mobile || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = await userModel.create({
    name,
    mobile,
    email,
    password,
  });

  return user;
};

// Find a user by email
export const findUserByEmail = async (email) => {
  if (!email) throw new Error("Email is required");

  return await userModel.findOne({ email }).select("+password");
};

// Generate OTP
const generateOTP = (length = 6) => {
  const otp = crypto
    .randomInt(0, 10 ** length)
    .toString()
    .padStart(length, "0");
  return otp;
};

// Send email verification OTP
export const sendVerificationOTP = async (user) => {
  const otp = generateOTP();
  user.verificationOTP = otp;
  user.verificationOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Verify your email",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });

  return otp;
};

// Verify email OTP
export const verifyEmailOTP = async (email, otp) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  if (user.verificationOTP !== otp) throw new Error("Wrong OTP");
  if (user.verificationOTPExpires < new Date()) throw new Error("OTP expired");

  user.isVerified = true;
  user.verificationOTP = undefined;
  user.verificationOTPExpires = undefined;
  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Welcome!",
    text: `Hi ${user.name}, your email is verified!`,
  });

  return user;
};

// Send OTP to reset password
// Send OTP to reset password
export const sendResetPasswordOTP = async (email) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Email not found"); // Corrected

  const otp = generateOTP();
  user.resetPasswordOTP = otp;
  user.resetPasswordOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Reset Password OTP",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });

  return otp;
};


// Verify reset OTP and set new password
export const verifyResetPasswordOTP = async (email, otp, newPassword) => {
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");

  if (user.resetPasswordOTP !== otp) throw new Error("Wrong OTP");
  if (user.resetPasswordOTPExpires < new Date()) throw new Error("OTP expired");

  user.password = await userModel.hashPassword(newPassword);
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpires = undefined;
  await user.save();

  return user;
};
