import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Required"]
    },
    description: {
      type: String,
      required: [true, "Description Required"]
    },
    timeline: {
      from: String,
      to: String  
    }
  },
  { timestamps: true }
);

export const Timeline = mongoose.model("Timeline", timelineSchema);
