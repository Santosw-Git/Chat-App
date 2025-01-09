import {Router} from "express";
import { sendMessage } from "../controllers/message.controller.js";

const messageRouter = new Router();

messageRouter.post("/send/:id",sendMessage);

export default messageRouter;