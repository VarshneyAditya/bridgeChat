import { Router } from "express";

import { getAllChats } from "../controller/chats.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const chatsRouter = Router();

chatsRouter.route('/conversation')
.get(protect, getAllChats)

export default chatsRouter;