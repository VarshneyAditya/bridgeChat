import Router from "express";

import cards from './src/routes/cards.routes.js';
import users from './src/routes/users.routes.js';
// import { cards } from "../controller/index.js";

const mainRouter = Router();

mainRouter.use("/users", users);
mainRouter.use("/cards", cards)
mainRouter.get('/', (_, res) => res.send('Health Check ok!!'))

export default mainRouter;