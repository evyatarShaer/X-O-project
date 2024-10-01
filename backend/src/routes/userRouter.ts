import express from 'express';
import { login, register } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/auth/register", register)
userRouter.post("/auth/login", login)

export default userRouter