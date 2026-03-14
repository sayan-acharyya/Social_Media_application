import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./Config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routers.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

/* ---------------- MIDDLEWARES ---------------- */

// JSON parser
app.use(express.json());

// cookie parser (needed for JWT cookies)
app.use(cookieParser());

// CORS configuration
app.use(
   cors({
      origin: process.env.FRONTEND_URL, // your frontend URL (React/Vite)
      credentials: true
   })
);

/* ---------------- DATABASE ---------------- */

connectDb();

/* ---------------- TEST ROUTE ---------------- */

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

/* ---------------- SERVER ---------------- */

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});