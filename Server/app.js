import express from 'express';
import cors from "cors";
import path from 'path';
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json({limit: "16kb"})); //This middleware is used to parse incoming requests that have a Content-Type of application/json, meaning the body of the request contains JSON data.
app.use(express.urlencoded({extended: true,limit: "16kb"})); //It helps in parsing data from HTTP request bodies that are sent via the application/x-www-form-urlencoded content type, which is commonly used by browsers when submitting forms.
app.use(express.static(path.resolve('public')));
app.use(cookieParser());


import userRouter from "./routes/user.route.js";
import messageRouter from './routes/message.route.js';
app.use("/api/auth",userRouter);
app.use("/api/message",messageRouter);

export default app;
