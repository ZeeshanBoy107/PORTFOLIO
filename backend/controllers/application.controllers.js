import ErrorHandler from "../middlewares/Error.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { SoftwareApplication } from "../models/application.model.js";
import {v2 as cloudinary} from 'cloudinary'

export const addNewApplication = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Software Application Icon required.", 400));
  }

  const { image } = req.files;
  const { name } = req.body;
  
  if(!name) return next(new ErrorHandler("Software name is required", 400))

  const cloudinaryResponse = await cloudinary.uploader.upload(
    image.tempFilePath,
    { folder: "PORTFOLIO SOFTWARE APPLICATION" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
  }

  const softwareApplication = await SoftwareApplication.create({ name, image: {
    public_id: cloudinaryResponse.public_id,
    url: cloudinaryResponse.secure_url
  } 
  });

  res.status(200).json({
    success: true,
    message: "New Software Application Created",
    softwareApplication
  })
})


export const deleteApplication = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const softwareApp = await SoftwareApplication.findById(id);

  if(!softwareApp) return next(new ErrorHandler("Software Application Doesn't Exist", 404));

  const softwareApplicationImageId = softwareApp.image.public_id;

  await cloudinary.uploader.destroy(softwareApplicationImageId);
  await softwareApp.deleteOne();
  res.status(200).json({
    success: true,
    message: "Software Application Deleted"
  });
})

export const getAllApplication = catchAsyncError(async (req, res, next) => {
  const softwareApps = await SoftwareApplication.find();
  res.status(200).json({
    success: true,
    softwareApps
  })
})
