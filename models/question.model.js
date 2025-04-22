import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.ObjectId, ref: "User" },
  questionpaper: { type: String, required: true },
  year: { type: String, required: true },
  sem: { type: String, required: true },
  branch: { type: String, required: true },
  kt: { type: Boolean, required: true },
  cloudpostname: { type: String, required: true },
});

export const Question = mongoose.model("Question", questionSchema);
