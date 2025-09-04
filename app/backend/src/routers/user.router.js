import Router from "express";
import { createuser } from "../controllers/user.controllers.js"
export const userRouter =  Router();


userRouter.route("/me").post(createuser);

