import express from "express";
import {
  checkUsername,
  deleteUser,
  editProfile,
  followUnfollow,
  getProfile,
  login,
  logout,
  signIn,
  suggestUser,
  updatePassword,
} from "../controllers/user.controller.js";
import isAuthantication from "../middlewares/isAuthinticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// User registration and authentication
router.post("/auth/register", signIn);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

// User account management
router.delete("/users/:userToDeleteId", isAuthantication, deleteUser); // Changed to DELETE for account deletion
router.put("/users/password", updatePassword);

// Profile and suggestions
router.get("/users/:username", isAuthantication, getProfile); // To fetch a specific user profile
router.post("/users/check-username", checkUsername); // Username availability check
router.get("/users/suggestions", isAuthantication, suggestUser); // Changed to GET for user suggestions

// Profile updates
router.put(
  "/users/profile",
  isAuthantication,
  upload.single("profilePic"),
  editProfile
); // Changed to PUT for profile edit
router.post("/users/:username/follow", isAuthantication, followUnfollow); // Follow/unfollow action

export default router;
