import express from "express";
import { resetPassword, sendOtp, signIn, signOut, signUp, verifyOtp } from "../controllers/auth.controllers.js";
import isAuth from "../middlewares/isAuth.js";


const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", isAuth, signOut);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);

export default router;

//3:46:46