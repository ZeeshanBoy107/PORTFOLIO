import mongoose from "mongoose";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required"]
  },
  email: {
    type: String,
    required: [true, "Email Required"]
  },
  phone: {
    type: String,
    required: [true, "Phone Number  Required"]
  },
  aboutMe: {
    type: String,
    required: [true, "About Me Field Is  Required"]
  },
  password: {
    type: String,
    required: [true, "Password Is Required"],
    minLength: [8, "Password must contain atleast 8 characters"],

  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  resume: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  portfolioURL: String,
  githubURL: String,
  linkedinURL: String,
  InstagramURL: String,
  facebookURL: String,
  xURL: String,

  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {timestamps: true})

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) {
    return next()
  };
  this.password = await bycrypt.hash(this.password, 10);
}); 

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

// Generating token
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: this._id
    },
    process.env.JWT_SECRET_KEY, 
    {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}

export const User = mongoose.model("User", userSchema);