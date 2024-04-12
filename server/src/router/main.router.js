import Router from "express";

import { getAllUsers, createUser } from "../controller/user.controller.js";
import login from "../controller/login.controller.js";

const mainRouter = Router();

mainRouter.route("/user").get(getAllUsers).post(createUser);
mainRouter.post("/login", login);

export default mainRouter;
