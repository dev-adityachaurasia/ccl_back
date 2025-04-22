import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: String,
      required: true,
    }, // This is the URL of the uploaded post content (image/video)
    cloudpostname: {
      type: String,
      required: true,
    }, // Name of the file on Cloudinary or other storage
    mediaType: {
      type: String,
      required: true,
    }, // Name of the file on Cloudinary or other storage
    caption: {
      type: String,
      maxlength: 500,
    }, // Post caption or description
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], // Tagged users in the post
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], // Array of users who liked the post
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ], // Array of comment IDs
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export const Post = mongoose.model("Post", postSchema);
