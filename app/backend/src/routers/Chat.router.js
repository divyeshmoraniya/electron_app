import Router from "express";
import { AddChat , getChat ,createGroupChat } from "../controllers/Chat.controllers.js";

export const chatRouter = Router();

chatRouter.route("/add").post(AddChat);
chatRouter.route("/getchat/:senderEmail").get(getChat);
chatRouter.route("/creategroup").post(createGroupChat)