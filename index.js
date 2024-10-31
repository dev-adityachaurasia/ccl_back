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

const corsOptions = {
  origin: ["https://inspectunivibe.com", "http://localhost:5173"],
  credentials: true,
};
const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is running......");
});
app.use("/", postRouter);
app.use("/", userRouter);
app.use("/", adminRouter);
app.use("/", messageRouter);

app.listen(process.env.PORT || 8000, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
