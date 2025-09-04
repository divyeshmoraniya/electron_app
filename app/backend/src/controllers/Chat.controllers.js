import { CHAT } from "../models/Chat.models.js"
import { User } from "../models/user.models.js";

export const AddChat = async (req, res) => {
    try {
        const { SenderEmail, ReceiverEmail } = req.body;
        console.log(req.body)
        if (!SenderEmail || !ReceiverEmail) {
            return res.status(402).json({ msg: "all detail required" });
        }

        const senderUser = await User.findOne({ Email: SenderEmail });
        const receiverUser = await User.findOne({ Email: ReceiverEmail });
        if (!senderUser) {
            return res.status(404).json({ msg: `Sender not found with email: ${SenderEmail}` });
        }

        if (!receiverUser) {
            return res.status(404).json({ msg: `Receiver not found with email: ${ReceiverEmail}` });
        }

        const receiverchecker = await User.findOne({ Email: ReceiverEmail })
        if (!receiverchecker) {
            return res.status(403).json({ msg: "user not found" })
        }

        let chat = await CHAT.findOne({
            $or: [
                { sender: senderUser._id, receiver: receiverUser._id },
                { sender: receiverUser._id, receiver: senderUser._id }
            ]
        });

        if (chat) {
            return res.status(200).json({ message: "Chat already exists", chat });
        }

        chat = await CHAT.create({
            sender: senderUser._id,
            receiver: receiverUser._id
        });

        return res.status(201).json({ message: "Chat started", chat });
    } catch (error) {
        console.log(error)
    }
}

export const getChat = async (req, res) => {
    try {
        const { senderEmail } = req.params;
        console.log(senderEmail)
        if (!senderEmail) {
            res.status(402).json({ msg: "sender not find" })
        };
        const senderId = await User.findOne({ Email: senderEmail });
        if (!senderId) {
            res.status(402).json({ msg: "sender is not found" })
        }
        const chats = await CHAT.find({
            $or: [{ sender: senderId._id }, { receiver: senderId._id }]
        }).populate("sender", "userName Email profileImg").populate("receiver", "userName Email profileImg").sort({ updatedAt: -1 });
        if (!chats) {
            res.status(402).json({ msg: "no chats found" });
        }

        res.status(200).json({ chats });

    } catch (error) {
        console.log(error)
    }
}