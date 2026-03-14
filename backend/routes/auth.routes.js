import express from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", isAuth, signOut);

export default router;