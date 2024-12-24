import {Router} from "express";
import { userLogin, userSignUp } from "../controllers/auth.controller.js";
const router = new Router();

router.post('/signup', userSignUp)
router.post('/login',userLogin)


export default router;