import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ], // Array of user IDs who are part of the conversation
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    }, // Reference to the last message sent in this conversation
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
