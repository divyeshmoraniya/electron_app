import express from "express" ;
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import { connectToDatabase } from "./src/db/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
// all import routes
import { userRouter } from "./src/routers/user.router.js";
import { chatRouter } from "./src/routers/Chat.router.js";
import { messageRouter } from "./src/routers/message.router.js";

const app = express();
const server = createServer(app);
dotenv.config({})
const port = process.env.PORT || 4000;

const io = new Server(server, {
  cors: {
    origin: "*", // or your frontend URL
    methods: ["GET", "POST"]
  }
});

// cors options
const corsOptions = {
    origin: "*",
    credentials: true,
    methods: 'GET, POST, DELETE, PATCH, HEAD, PUT, OPTIONS',
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Credentials',
        'cache-control',
        'svix-id',
        'svix-timestamp',
        'svix-signature',
    ],
    exposedHeaders: ['Authorization'],
};

// default middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static('/tmp', { index: false }));

app.get("/",(req,res) => {
    res.status(200).json({msg : "backend is running"})
})

// all required  apis 
app.use("/api/user", userRouter);
app.use("/api/chat",chatRouter);
app.use("/api/message",messageRouter);


let users = new Map();

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // When user joins (send userId from frontend)
  socket.on("addUser", (userId) => {
    users.set(userId, socket.id);
    console.log("Connected users:", users);
  });

  // Handle sending messages
  socket.on("sendMessage", ({ conversationId, senderId, receiverId, text, emoji, attachments }) => {
    const receiverSocketId = users.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", {
        conversationId,
        senderId,
        text,
        emoji,
        attachments,
        createdAt: new Date(),
      });
    }
  });

  // On disconnect
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
    for (let [key, value] of users.entries()) {
      if (value === socket.id) {
        users.delete(key);
        break;
      }
    }
  });
});

connectToDatabase().then(() => {
   server.listen(port , () => {
    console.log(`app is running on port : ${port}`)
})
});
