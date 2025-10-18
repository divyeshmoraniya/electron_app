import Router from "express";
import { createuser, getuser } from "../controllers/user.controllers.js"
export const userRouter =  Router();


userRouter.route("/me").post(createuser);
userRouter.route("/myuser/:Email").get(getuser);

