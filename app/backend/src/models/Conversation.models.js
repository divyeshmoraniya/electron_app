import mongoose from "mongoose";
import { User } from "./user.models.js";

const conversationSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isGroup: { type: Boolean, default: false },
  title: String,
  lastMessageAt: Date
}, { timestamps: true });

export const Conversation = mongoose.model("Conversation",conversationSchema);