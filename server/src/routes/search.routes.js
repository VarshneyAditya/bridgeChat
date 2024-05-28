import { Router } from "express";
import { search } from "../controller/search.controller.js";

const searchRouter = Router();

searchRouter.route("/")
.get(search);

export default searchRouter;
