import express from "express" ;
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import { connectToDatabase } from "./src/db/db.js";


// all import routes
import { userRouter } from "./src/routers/user.router.js";
import { chatRouter } from "./src/routers/Chat.router.js";

const app = express();
dotenv.config({})
const port = process.env.PORT || 4000;

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


connectToDatabase().then(() => {
   app.listen(port , () => {
    console.log(`app is running on port : ${port}`)
})
});
