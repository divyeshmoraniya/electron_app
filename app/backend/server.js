import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./src/db/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
// all import routes
import { userRouter } from "./src/routers/user.router.js";
import { chatRouter } from "./src/routers/Chat.router.js";
import { messageRouter } from "./src/routers/message.router.js";
import { User } from "./src/models/user.models.js";
import { Message } from "./src/models/Message.models.js";
import { decryptText } from "./src/security/aes-encryption.js";

const app = express();
const server = createServer(app);
dotenv.config({});
const port = process.env.PORT || 4000;

const io = new Server(server, {
  cors: {
    origin: "*", // or your frontend URL
    methods: ["GET", "POST"],
  },
});

// cors options
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET, POST, DELETE, PATCH, HEAD, PUT, OPTIONS",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
    "cache-control",
    "svix-id",
    "svix-timestamp",
    "svix-signature",
  ],
  exposedHeaders: ["Authorization"],
};

// default middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static("/tmp", { index: false }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "backend is running" });
});

// all required  apis
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

let users = new Map();

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // When user joins (send userId from frontend)
  socket.on("addUser", async (userId) => {
    users.set(userId, socket.id);

    // Update lastSeen to current time when user comes online
    try {
      await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
    } catch (error) {
      console.error("Error updating lastSeen:", error);
    }

    // Send current online users to the newly connected user
    socket.emit("getUsers", Array.from(users.keys()));

    // Broadcast to all clients that this user is now online
    io.emit("userOnline", userId);
  });

  // KEEP YOUR EXISTING sendMessage EXACTLY AS IT IS - NO CHANGES
  socket.on(
    "sendMessage",
    async ({
      conversationId,
      senderId,
      receiverId,
      text,
      emoji,
      attachments,
    }) => {
      try {
        const receiverSocketId = users.get(receiverId);
        // find the most recent message in this conversation from this sender (or use params you send)
        // NOTE: because your sendMessage controller already created the Message, we query DB for the latest message by sender in conversation
        const latest = await Message.findOne({
          conversation: conversationId,
          sender: senderId,
        })
          .sort({ createdAt: -1 })
          .lean();

        let decryptedText = text; // fallback to the received text
        if (latest && latest.key && latest.text) {
          try {
            decryptedText = await decryptText(latest.key, latest.text);
          } catch (err) {
            console.error("Decryption during socket emit failed:", err);
          }
        }

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("getMessage", {
            conversationId,
            senderId,
            text: decryptedText, // send decrypted text
            emoji,
            attachments,
            createdAt: new Date(),
            senderName: undefined, // optional additional meta
            senderEmail: undefined,
            senderProfileImg: undefined,
          });
        }
      } catch (err) {
        console.error("Socket sendMessage handler error:", err);
      }
    }
  );

  // On disconnect
  socket.on("disconnect", async () => {
    console.log("🔴 User disconnected:", socket.id);
    let disconnectedUserId = null;

    for (let [userId, socketId] of users.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        users.delete(userId);
        break;
      }
    }

    if (disconnectedUserId) {
      console.log("❌ User removed:", disconnectedUserId);
      console.log("📊 Remaining users:", Array.from(users.keys()));

      // Update lastSeen when user goes offline
      try {
        await User.findByIdAndUpdate(disconnectedUserId, {
          lastSeen: new Date(),
        });
      } catch (error) {
        console.error("Error updating lastSeen:", error);
      }

      // Broadcast to all clients that this user is now offline
      io.emit("userOffline", disconnectedUserId);
    }
  });
});

connectToDatabase().then(() => {
  server.listen(port, () => {
    console.log(`app is running on port : ${port}`);
  });
});
