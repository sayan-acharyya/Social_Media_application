import express from "express";
import dotenv from "dotenv";
import connectDb from "./Config/db.js";

dotenv.config();
const app = express();

const port = process.env.PORT

connectDb();
app.listen(port, () => {  
   console.log(`server running on ${port}`);
})



