import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/Error.js";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = catchAsyncError(async (req, res, next) => {
  if(!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar and Resume are required."))
  }

  const { avatar, resume } = req.files;

  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(avatar.tempFilePath, { folder: "MY_AVATAR" });
  if(!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error"
    )
  }

  const cloudinaryResponseForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "MY_RESUME" }
  );
  if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryResponseForResume.error || "Unknown Cloudinary Error"
    );
  }

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    linkedinURL,
    InstagramURL,
    facebookURL,
    xURL 
    }
    = req.body;

    const user = await User.create({
      fullName,
      email,
      phone,
      aboutMe,
      password,
      avatar: {
        public_id: cloudinaryResponseForAvatar.public_id,
        url: cloudinaryResponseForAvatar.secure_url,
      },
      resume: {
        public_id: cloudinaryResponseForResume.public_id,
        url: cloudinaryResponseForResume.secure_url,
      },
      portfolioURL,
      githubURL,
      linkedinURL,
      InstagramURL,
      facebookURL,
      xURL,
    });

    res.status(200).json({
      success: true,
      message: "User Registered"
    })
})

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) return next(new ErrorHandler("Email and Password are required!", 400))
  
  const user = await User.findOne({ email });

  if(!user) return next(new ErrorHandler("User doesn't exists", 404));

  const isPasswordCorrect = await user.comparePassword(password);

  if(!isPasswordCorrect) return next(new ErrorHandler("Incorrect Password"));

  const token = generateToken(user, res);

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    token: token,
    message: "Login Successfull",
    user: user
  })
})

export const logout = catchAsyncError(async (req, res, next) => {

  const options = {
    httOnly: true,
    secure: true,
    expires: new Date(Date.now()),
    sameSite: "None",
    secure: true
  };

  res.status(200).cookie("token", "", options).json({
    success: true,
    message: "Logout Successfully"
  })
})

export const getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
    linkedinURL: req.body.linkedinURL,
    InstagramURL: req.body.InstagramURL,
    facebookURL: req.body.facebookURL,
    xURL: req.body.xURL,
  };
  if(req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(profileImageId);

    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "MY_AVATAR" }
    );

    newUserData.avatar = {
      public_id: cloudinaryResponseForAvatar.public_id,
      url: cloudinaryResponseForAvatar.secure_url
    }
  }


  if(req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeImageId = user.resume.public_id;
    await cloudinary.uploader.destroy(resumeImageId);

    const cloudinaryResponseForResume = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: "MY_RESUME" }
    );

    newUserData.resume = {
      public_id: cloudinaryResponseForResume.public_id,
      url: cloudinaryResponseForResume.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated",
    user
  })
})

export const updatePassword = catchAsyncError(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if(!currentPassword || !newPassword ||!confirmNewPassword) {
    return next(new ErrorHandler("All fields are required!", 400))
  }

  
  const user = await User.findById(req.user.id).select("+password");
  
  const isPasswordCorrect = await user.comparePassword(currentPassword);
  
  if(!isPasswordCorrect) {
    return next(
      new ErrorHandler(
        "Incorrect Current Password",
        400
      )
    );
  }

  if(newPassword !==  confirmNewPassword) {
    return next(new ErrorHandler("New Password and Confirm New Password must be same", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    seccess: true,
    message: "Password Updated"
  })
})

export const getUserForPortfolio = catchAsyncError(async (req, res, next) => {
  const id = "6672e077d93e2d02d50c3ce0";
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user
  })
})

export const forgotPassword = (async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if(!user) return next(new ErrorHandler("Email doesn't exists", 404));

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  const message = `Click here to Reset your Password:- \n\n ${resetPasswordURL} \n\n
  If you've not requested for this pls ignore it. \n\n Thank You`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Personal Portfolio Dashboard Recovery Password",
      message
    });
    res.status(200).json({
      success: true,
      message: `Email Sent to ${user.email}`
    })
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
})

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { resettoken } = req.params;
  console.log(resettoken);
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(resettoken)
  .digest("hex");

  const user = await User.findOne ({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now()}
  })

  if(!user) {
    return next(new ErrorHandler("Reset Password Token is invalid or Expired", 400))
  }

  if(req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password and Confirm Password do not match"))
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  const token = generateToken(user, res);

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    token: token,
    message: "Password Reset Successfully",
    user: user,
  });
})