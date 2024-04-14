import { Router } from "express";
import { cards } from "../controller/cards.controller.js";

const userRouter = Router();

userRouter.route("/cards")
.get(cards);

export default userRouter;
