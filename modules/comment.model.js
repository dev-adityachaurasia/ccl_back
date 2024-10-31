import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // User who made the comment
    comment: {
      type: String,
      required: true,
    }, // The text of the comment
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    }, // The post to which the comment belongs
    commentReplies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentReply",
      },
    ], // Array of replies to the comment
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
