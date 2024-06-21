import { User } from "../models/user.model.js"
import { catchAsyncError } from "./catchAsyncErrors.js"
import ErrorHandler from "./Error.js"
import jwt from "jsonwebtoken";


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if(!token) {
    return next(new ErrorHandler("Unauthorized Request", 400))
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decodedToken.id);

  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.user = user;
  next()
})
