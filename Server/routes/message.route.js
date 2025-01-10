import {Router} from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
const messageRouter = new Router();

messageRouter.post("/send/:id",protectRoute,sendMessage);

export default messageRouter;