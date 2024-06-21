import ErrorHandler from "../middlewares/Error.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { v2 as cloudinary } from "cloudinary";
import { Project } from "../models/project.model.js";

export const addNewProject = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner required.", 400));
  }

  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (!title || 
    !description || 
    !gitRepoLink || 
    !projectLink || 
    !technologies || 
    !stack || 
    !deployed )
    {
    return next(new ErrorHandler("All fields are required!", 400));
    }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    { folder: "PORTFOLIO PROJECT" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Project Added",
    project,
  });
});

export const deleteProject = catchAsyncError(async (req, res, next) => {   
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) return next(new ErrorHandler("Project Doesn't Exist", 404));

  const projectImageId = project.projectBanner.public_id;

  await cloudinary.uploader.destroy(projectImageId);
  await project.deleteOne();
  res.status(200).json({
    success: true,
    message: "Project Deleted",
  });
});

export const updateProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    technologies: req.body.technologies,
    stack: req.body.stack,
    deployed: req.body.deployed,
  };

  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(id);
    const projectBannerId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectBannerId);

    const cloudinaryResponse = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: "PORTFOLIO PROJECT" }
    );

    newProjectData.projectBanner = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }


  const project = await Project.findByIdAndUpdate(
    id,
    newProjectData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Project Updated",
    project,
  });
});

export const getAllProject = catchAsyncError(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});

export const getOneProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if(!project) return next(new ErrorHandler("Project doesn't exists", 404))

  res.status(200).json({
    success: true,
    project,
  });
});
