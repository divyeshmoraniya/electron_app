import { Conversation } from "../models/Conversation.models.js";
import { User } from "../models/user.models.js";
/**
 * Start or get existing conversation between two users (by email)
 */
export const AddChat = async (req, res) => {
  try {
    const { SenderEmail, ReceiverEmail } = req.body;

    if (!SenderEmail || !ReceiverEmail) {
      return res.status(400).json({ msg: "Both emails are required" });
    }

    // Find users by email
    const senderUser = await User.findOne({ Email: SenderEmail });
    const receiverUser = await User.findOne({ Email: ReceiverEmail });

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      isGroup: false,
      members: { $all: [senderUser._id, receiverUser._id] },
    });

    // If exists → return it
    if (conversation) {
      return res.status(200).json({
        message: "Conversation already exists",
        conversation,
      });
    }

    // Else → create a new one
    conversation = await Conversation.create({
      members: [senderUser._id, receiverUser._id],
      isGroup: false,
      lastMessageAt: new Date(),
    });

    return res.status(201).json({
      message: "New conversation started",
      conversation,
    });
  } catch (error) {
    console.error("AddChat Error:", error);
    return res.status(500).json({ msg: "Server error", error });
  }
};

/**
 * Get all conversations for a given user (by email)
 */
export const getChat = async (req, res) => {
  try {
    const { senderEmail } = req.params;

    if (!senderEmail) {
      return res.status(400).json({ msg: "Sender email required" });
    }

    const sender = await User.findOne({ Email: senderEmail });
    if (!sender) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Find all conversations where user is a member
    const conversations = await Conversation.find({
      members: sender._id,
    })
      .populate("members", "userName Email profileImg")
      .sort({ updatedAt: -1 });

    if (!conversations || conversations.length === 0) {
      return res.status(200).json({ msg: "No conversations found", conversations: [] });
    }

    res.status(200).json({ conversations });
  } catch (error) {
    console.error("getChat Error:", error);
    return res.status(500).json({ msg: "Server error", error });
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { title, memberEmails } = req.body;

    if (!title || !memberEmails || memberEmails.length < 2) {
      return res.status(400).json({ msg: "Need group name and 2+ members" });
    }

    const members = await User.find({ Email: { $in: memberEmails } });

    const newGroup = await Conversation.create({
      title,
      members: members.map((u) => u._id),
      isGroup: true,
    });

    res.status(201).json({ message: "Group created", newGroup });
  } catch (error) {
    console.error("createGroupChat Error:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};
