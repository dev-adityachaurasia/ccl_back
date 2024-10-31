import { Conversation } from "../modules/conversation.model.js"; // Fixed typo
import { Message } from "../modules/message.model.js";

// 1. Send a Message
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id; // Assumed to be obtained from authentication middleware
    const recipientId = req.params.id;
    const { messageText } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recipientId],
      });
    }

    const newMessage = await Message.create({
      sender: senderId,
      receiver: recipientId,
      message: messageText.trim(),
    });

    conversation.message.push(newMessage._id);
    await conversation.save();

    return res.status(200).json({
      message: "Message sent successfully",
      success: true,
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// 2. Get All Messages in a Conversation
export const getAllMessages = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const conversation = await Conversation.findById(conversationId).populate({
      path: "message",
      populate: { path: "sender receiver", select: "username profilePic" },
    });

    if (!conversation) {
      return res
        .status(404)
        .json({ message: "Conversation not found", success: false });
    }

    return res.status(200).json({
      message: "Messages retrieved successfully",
      success: true,
      messages: conversation.message,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// 3. Get All Participants of a Conversation
export const getAllParticipants = async (req, res) => {
  try {
    const userId = req.id;
    const conversationId = req.params.id;
    if (userId === conversationId) {
      const conversation = await Conversation.find({
        participants: { $in: [userId] },
      }).populate("participants", "username profilePic");
      if (!conversation) {
        return res
          .status(404)
          .json({ message: "Conversation not found", success: false });
      }

      return res.status(200).json({
        message: "Participants retrieved successfully",
        success: true,
        participants: conversation,
      });
    }
    return res
      .status(200)
      .json({ message: "Not a Valid Search", success: false });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// 4. Get Previous Conversations of a User
export const getPreviousConversations = async (req, res) => {
  try {
    const userId = req.id; // Assumed to be obtained from authentication middleware
    const conversations = await Conversation.find({ participants: userId })
      .populate("participants", "username profilePic")
      .populate({
        path: "message",
        options: { sort: { createdAt: -1 }, limit: 1 }, // Get last message only
        populate: { path: "sender receiver", select: "username profilePic" },
      });

    return res.status(200).json({
      message: "Previous conversations retrieved successfully",
      success: true,
      conversations,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// 5. Unsend (Delete) a Specific Message
export const unsendMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const userId = req.id; // Assumed to be obtained from authentication middleware

    const message = await Message.findById(messageId);
    if (!message) {
      return res
        .status(404)
        .json({ message: "Message not found", success: false });
    }

    if (
      message.sender.toString() !== userId &&
      message.receiver.toString() !== userId
    ) {
      return res.status(403).json({
        message: "Unauthorized to delete this message",
        success: false,
      });
    }

    await message.deleteOne();
    await Conversation.updateMany(
      { message: messageId },
      { $pull: { message: messageId } }
    );

    return res.status(200).json({
      message: "Message deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// 6. Delete All Messages in a Conversation (Clear Chat)
export const deleteAllMessages = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const userId = req.id; // Assumed to be obtained from authentication middleware

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res
        .status(404)
        .json({ message: "Conversation not found", success: false });
    }

    if (!conversation.participants.includes(userId)) {
      return res.status(403).json({
        message: "Unauthorized to clear this conversation",
        success: false,
      });
    }

    await Message.deleteMany({ _id: { $in: conversation.message } });
    conversation.message = [];
    await conversation.save();

    return res.status(200).json({
      message: "All messages in the conversation deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
