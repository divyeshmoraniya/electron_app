import { Message } from "../models/Message.models.js";
import { Conversation } from "../models/Conversation.models.js";
import { uploadoncloudinary } from "../utils/clodinery.js";
import { decryptText, encryptText } from "../security/aes-encryption.js";

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text, emoji } = req.body;

    let attachments = [];
    const uploadPromises = req.files.map(
      async (file) => await uploadoncloudinary(file.path)
    );
    const results = await Promise.all(uploadPromises);
    attachments = results.map((r) => r.secure_url);

    const cipher_text = await encryptText(text);

    const message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      key: cipher_text.key,
      text: cipher_text.encryptedHex,
      emoji,
      attachments,
    });

    // Update conversation last activity
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessageAt: new Date(),
    });

    return res.status(201).json({ message });
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // same query
    const messages = await Message.find({ conversation: conversationId }).sort({
      createdAt: 1,
    });

    // keep same variable name and array (mutates in place)
    for (const msg of messages) {
      try {
        msg.text = await decryptText(msg.key, msg.text);
      } catch (err) {
        console.error("Decryption failed for message:", msg._id, err.message);
        msg.text = "[decryption failed]";
      }
    }

    // same response structure as your original code
    res.status(200).json({ messages });
  } catch (error) {
    console.error("getMessages Error:", error);
    return res.status(500).json({ msg: "Server error", error });
  }
};
