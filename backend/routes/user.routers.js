import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { editProfile, follow, followingList, getCurrentUser, getProfile, search, suggestedUsers } from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/current", isAuth, getCurrentUser);
router.get("/suggestedusers", isAuth, suggestedUsers);
router.put("/editProfile", isAuth, upload.single("profileImage"), editProfile);
router.get("/getProfile/:userName", isAuth, getProfile);
router.get("/follow/:targetUserid", isAuth, follow);
router.get("/followingList", isAuth, followingList);
router.get("/search", isAuth, search);

export default router;