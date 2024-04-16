import { Router } from "express";

import { protect } from "../middleware/authMiddleware.js";

import { getAllMessages } from "..//controller/messages.controller.js";

const messageRouter = Router();

messageRouter.route("/:chatId")
    .get(protect, getAllMessages);

export default messageRouter;
