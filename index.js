import express from "express";
import router from "./routes/Url.js";
import UsersRouter from "./routes/Users.js";
import StaticRouter from "./routes/StaticRoute.js";
import { connectMONGO } from "./config.js";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { restrictToLoggedInUserOnly, checkAuth } from "./middleware/auth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
connectMONGO();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictToLoggedInUserOnly, router);
app.use("/users", UsersRouter);
app.use("/", checkAuth, StaticRouter);

app.listen(process.env.PORT, () => {
  console.log("Server Started at", process.env.PORT);
});
