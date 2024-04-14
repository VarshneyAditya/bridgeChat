import { Router } from "express";
import { login, signup } from "../controller/users.controller.js";

const userRouter = Router();

userRouter.route("/login")
    .post(login);

userRouter.route("/sign-up")
    .post(signup);
    
export default userRouter;
