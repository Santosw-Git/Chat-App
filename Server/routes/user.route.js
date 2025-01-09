import {Router} from "express";
import { userLogin, userSignUp,userLogOut } from "../controllers/auth.controller.js";
const userRouter = new Router();

userRouter.post('/signup', userSignUp)
userRouter.post('/login',userLogin)
userRouter.post('/logout', userLogOut)


export default userRouter;