import express from "express";
import isAuthantication from "../middlewares/isAuthinticated.js";
import {
  deleteAllMessages,
  getAllMessages,
  getAllParticipants,
  getPreviousConversations,
  sendMessage,
  unsendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// Send a new message to a specific user or conversation
router.post("/conversations/:id/messages", isAuthantication, sendMessage);

// Retrieve all messages in a specific conversation
router.get("/conversations/:id/messages", isAuthantication, getAllMessages);

// Unsend a specific message by its ID
router.delete("/messages/:messageId", isAuthantication, unsendMessage);

// Delete all messages in a specific conversation
router.delete("/conversations/:conversationId/messages", isAuthantication, deleteAllMessages);

// Get all participants in a specific conversation
router.get("/conversations/:id/participants", isAuthantication, getAllParticipants);

// Get previous conversations for the logged-in user
router.get("/conversations/previous", isAuthantication, getPreviousConversations);

export default router;
