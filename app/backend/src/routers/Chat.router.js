import Router from "express";
import { AddChat } from "../controllers/Chat.controllers.js";
import { getChat } from "../controllers/Chat.controllers.js";

export const chatRouter = Router();

chatRouter.route("/add").post(AddChat);
chatRouter.route("/getchat/:senderEmail").get(getChat);