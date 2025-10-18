import Router from "express";
import { upload } from "../middelwares/multer.middelwares.js";
import { sendMessage ,getMessages } from "../controllers/message.controller.js";

export const messageRouter = Router();

messageRouter.route("/sendmessage").post(upload.array("attachments",10) , sendMessage )
messageRouter.route("/getmessage/:conversationId").get(getMessages);