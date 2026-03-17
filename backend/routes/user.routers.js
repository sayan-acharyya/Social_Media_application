import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser, suggestedUsers } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/current", isAuth, getCurrentUser);
router.get("/suggestedusers", isAuth, suggestedUsers);

export default router;