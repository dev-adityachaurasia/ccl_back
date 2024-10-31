import express from "express";
import upload from "../middlewares/multer.js";
import {
  commentPost,
  deletePost,
  dislikePost,
  editPost,
  getAllPost,
  getComments,
  getUserPost,
  isLiked,
  likePost,
  newPost,
  savePost,
  isSaved,
} from "../controllers/post.controller.js";

const router = express.Router();

// Create a new post
router.post("/posts", upload.single("post"), newPost);

// Fetch all posts
router.get("/all-posts", getAllPost);

// Fetch posts by specific user
router.get("/users/:username/posts", getUserPost);

// Update a specific post by ID
router.put("/posts/:postid", editPost);

// Like a post by ID
router.post("/posts/:postid/like", likePost);

// Dislike a post by ID
router.post("/posts/:postid/dislike", dislikePost);

// Fetch comments for a specific post
router.get("/posts/:postid/comments", getComments);

// Add a comment to a specific post
router.post("/posts/:postid/comments", commentPost);

// Delete a specific post by ID
router.delete("/posts/:postid", deletePost);

// Save a specific post by ID
router.post("/posts/:postid/save", savePost);

// Check if a post is liked by the authenticated user
router.post("/posts/:postid/is-liked", isLiked);

// Check if a post is saved by the authenticated user
router.post("/posts/:postid/is-saved", isSaved);

export default router;
