import express from "express";
import { handleGenerateNewUrl, handleRedirects, handleUrlAnalytics } from "../controllers/Url.js";
const router = express.Router();

router.route("/").post(handleGenerateNewUrl);
router.route("/:id").get(handleRedirects);
router.route("/analytics").get(handleUrlAnalytics);

export default router;
