import {Router} from "express";
import { userLogin, userSignUp,userLogOut } from "../controllers/auth.controller.js";
const authRouter = new Router();

authRouter.post('/signup', userSignUp)
authRouter.post('/login',userLogin)
authRouter.post('/logout', userLogOut)


export default authRouter;