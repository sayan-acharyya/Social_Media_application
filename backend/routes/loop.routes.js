import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { comment, getAllLoops, like, uploadLoop } from "../controllers/loop.controller.js";


const router = express.Router();

router.post("/upload", isAuth, upload.single("media"), uploadLoop);

router.get("/getAll", isAuth, getAllLoops);

router.get("/like/:loopId", isAuth, like);

router.post("/comment/:loopId", isAuth, comment);

export default router;