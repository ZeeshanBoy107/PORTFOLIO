import ErrorHandler from '../middlewares/Error.js';
import { catchAsyncError } from '../middlewares/catchAsyncErrors.js';
import { Timeline } from "../models/timeline.model.js"


export const postTimeline = catchAsyncError(async (req, res, next) => {
  const { title, description, from, to } = req.body;

  const timeline = await Timeline.create({
    title,
    description,
    timeline: { from, to }
  });

  res.status(200).json({
    success: true,
    message: "Timeline Added",
    timeline
  })
})

export const deleteTimeline = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const timeline = await Timeline.findById(id);

  if(!timeline) return next(new ErrorHandler("Timeline doesn't exists", 404));

  await timeline.deleteOne();
  
  res.status(200).json({
    success: true,
    message: "Timeline Deleted"
  })
})

export const getAllTimelines = catchAsyncError(async (req, res, next) => {
  const timelines = await Timeline.find();

  res.status(200).json({
    status: true,
    timelines
  })
})