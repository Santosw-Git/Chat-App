import {Router} from "express";
import { sendMessage,getMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
const messageRouter = new Router();

messageRouter.post("/send/:id",protectRoute,sendMessage);
messageRouter.get("/:id",protectRoute,getMessage);


export default messageRouter;