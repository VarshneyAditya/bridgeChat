import { Router } from "express";

import {
  getAllChats,
  createChat,
  fetchGroupChat,
  fetchAllUsersController,
} from "../controller/chats.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const chatsRouter = Router();

chatsRouter
  .route("/conversation")
  .get(protect, getAllChats)
  .post(protect, createChat);

chatsRouter.route("/fetchGroupChat").get(fetchGroupChat);
chatsRouter.route("/fetchAllUsers").get(protect, fetchAllUsersController);

export default chatsRouter;
