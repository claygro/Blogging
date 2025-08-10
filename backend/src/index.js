import express from "express";
import mongoose from "mongoose";
import router from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
const app = express();
app.use(
  cors({
    origin: "https://blogging-frontend-cjgg.onrender.com",

    credentials: true,
  })
);
// ✅ Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/blog", router);

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    console.log("server is starting");
  } catch (error) {
    console.log(`error in starting the server ${error}`);
  }
});
