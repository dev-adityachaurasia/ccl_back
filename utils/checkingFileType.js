import sharp from "sharp";
import path from "path";
import cloudinary from "../utils/cloudinary.js";
import datauri from "./datauri.js";

// Function to determine if a file is an image or video
const checkFileType = async (post) => {
  try {
    // Get the file extension
    const extname = path.extname(post.originalname).toLowerCase();

    // Define image and video extensions
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp",".svg"];
    const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".webm", ".flv"];

    if (imageExtensions.includes(extname)) {
      // Handle image files
      const resizeImg = await sharp(post.buffer)
        .resize({
          width: 800,
          height: 800,
          fit: "inside",
        })
        .toFormat("jpeg", { quality: 80 }) // Correct format usage
        .toBuffer();
      const base64Image = resizeImg.toString("base64");

      // Construct the Data URI
      const dataUri = `data:image/jpeg;base64,${base64Image}`;

      // Upload to Cloudinary
      const response = await cloudinary.uploader.upload(dataUri);
      return response;
    } else if (videoExtensions.includes(extname)) {
      const dataUri = datauri(post);

      // Upload to Cloudinary
      let response = await cloudinary.uploader.upload(dataUri, {
        resource_type: "video",
      });
      return response;
    } else {
      return { message: "Unknown file type" };
    }
  } catch (error) {
    console.error("Error processing file:", error);
    throw error;
  }
};

export default checkFileType;