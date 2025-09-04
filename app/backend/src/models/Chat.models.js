import mongoose from "mongoose";
import { User } from "./user.models.js";

const Chat = new mongoose.Schema({
    sender :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiver :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    
},{timestamps : true});

export const CHAT = mongoose.model("CHAT",Chat);