import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      minLength: [2, "Name should atleast have 2 characters"],
    },
    subject: {
      type: String,
      minLength: [2, "Subject should atleast have 2 characters"],
    },
    message: {
      type: String,
      minLength: [2, "Message should atleast have 2 characters"],
    },
  },
  { timestamps: true }
);



export const Message = mongoose.model("Message", messageSchema);