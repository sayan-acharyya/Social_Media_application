import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { comment, getAllPosts, like, saved, uploadPost } from "../controllers/post.controller.js";

const router = express.Router();
router.post("/upload", isAuth, upload.single("media"), uploadPost);

router.get("/getAll", isAuth, getAllPosts);

router.get("/like/:postId", isAuth, like);

router.get("/saved/:postId", isAuth, saved);

router.post("/comment/:postId", isAuth, comment);

export default router;