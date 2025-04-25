import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import messageRouter from "./routes/message.routes.js";

dotenv.config({});

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173", "https://inspectunivibe.com"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/", postRouter);
app.use("/", userRouter);
app.use("/", adminRouter);
app.use("/", messageRouter);
app.get("/", (req, res) => {
  res.send("Backend is running......");
});

app.listen(process.env.PORT || 8001, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
