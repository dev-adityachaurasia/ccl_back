import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    event: { type: String, required: true },
    description: { type: String, required: true },
    cloudpostname: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export const Event = mongoose.model("Event", eventSchema);
