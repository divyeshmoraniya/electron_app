import Router from "express";
import { AddChat } from "../controllers/Chat.controllers.js";
import { getChat } from "../controllers/Chat.controllers.js";

export const chatRouter = Router();

chatRouter.route("/addchat").post(AddChat);
chatRouter.route("/getchat").get(getChat);