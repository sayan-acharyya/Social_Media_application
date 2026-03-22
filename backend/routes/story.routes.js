import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { getStoryByUserName, uploadStory, viewStory } from "../controllers/story.controller.js";


const router = express.Router();

router.post("/upload", isAuth, upload.single("media"), uploadStory);
router.get("/getByUserName/:userName", isAuth, getStoryByUserName);
router.get("/view/:storyId", isAuth, viewStory);

export default router;