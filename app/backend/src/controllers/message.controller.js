import { Message } from "../models/Message.models.js"
import { Conversation } from "../models/Conversation.models.js";
import { uploadoncloudinary } from "../utils/clodinery.js";

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text, emoji } = req.body;

    let attachments = [];
    const uploadPromises = req.files.map(async (file) =>
      await uploadoncloudinary(file.path)
    );
    const results = await Promise.all(uploadPromises);
    attachments = results.map(r => r.secure_url);


    const message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text,
      emoji,
      attachments,
    });

    // Update conversation last activity
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessageAt: new Date(),
    });

    return res.status(201).json({ message });

  } catch (error) {
    console.log(error)
  }
}

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversation: conversationId })
      .sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("getMessages Error:", error);
    return res.status(500).json({ msg: "Server error", error });
  }
};