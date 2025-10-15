// Import necessary packages
import mongoose from "mongoose";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // User must provide a name
  },
  mobile: {
    type: String,
    required: true, // Mobile number is required
    unique: true, // No two users can have the same mobile
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false, 
  },
  verificationOTP: {
    type: String,
  },
  verificationOTPExpires: {
    type: Date, 
  },
  resetPasswordOTP: {
    type: String, 
  },
  resetPasswordOTPExpires: {
    type: Date, 
  },
});


userSchema.methods.generateAuthToken = function () {
 
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET, 
    { expiresIn: "1h" } 
  );
  return token;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, 10); 
  return hashedPassword;
};

const User = mongoose.model("User", userSchema);

export default User;
