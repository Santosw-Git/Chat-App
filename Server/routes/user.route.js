import {Router} from "express";
import { getUserForSiderBar } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
const userRouter = Router();

userRouter.get('/',protectRoute,getUserForSiderBar);

export default userRouter;