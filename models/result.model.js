import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.ObjectId, ref: "User" },
  result: { type: String, required: true },
  year: { type: String, required: true },
  sem: { type: String, required: true },
  branch: { type: String, required: true },
  kt: { type: Boolean, required: true },
  reval: { type: Boolean, required: true },
  cloudpostname: { type: String, required: true },
});

export const Result = mongoose.model("Result", resultSchema);
