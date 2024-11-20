import express from "express";
import { loginInUser, signInUsers } from "../controllers/Users.js";
const UsersRouter = express.Router();

UsersRouter.post("/", signInUsers);
UsersRouter.post("/login", loginInUser);

export default UsersRouter;
