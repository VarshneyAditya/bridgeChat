import Router from "express";

import { getAllUsers, createUser } from "../controller/user.controller.js";
import cards from "../controller/cards.controller.js"; 
import login from "../controller/login.controller.js";

const mainRouter = Router();

mainRouter.route("/user").get(getAllUsers).post(createUser);
mainRouter.post("/login", login);
mainRouter.post("/cards", cards)
mainRouter.get('/', (_, res) => res.send('Health Check ok!!'))

export default mainRouter;
