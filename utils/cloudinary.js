import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({});

cloudinary.config({
  api_secret: process.env.CLOUD_SECRET,
  api_key: process.env.CLOUD_KEY,
  cloud_name: process.env.CLOUD_NAME,
});

export default cloudinary;