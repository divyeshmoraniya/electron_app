import mongoose from "mongoose";
import { Conversation } from "./Conversation.models.js";
import { User } from "./user.models.js";

const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  attachments: [String],
  emoji : String
}, { timestamps: true });

export const  Message = mongoose.model("Message", messageSchema);