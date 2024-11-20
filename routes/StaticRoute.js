import express from "express";
import Url from "../model/Url.js";
const StaticRouter = express.Router();

StaticRouter.get("/", (req, res) => {
  return res.render("home");
});

StaticRouter.get("/signin", (req, res) => {
  return res.render("Signin");
});

StaticRouter.get("/login", (req, res) => {
  return res.render("Login");
});

StaticRouter.get("/analytics", async (req, res) => {
  if (!req.currUser) {
    return res.redirect("/login");
  }
  try {
    const allUrls = await Url.find({ createdBy: req.currUser._id });
    console.log(allUrls);
    return res.render("analytics", { urls: allUrls });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default StaticRouter;
