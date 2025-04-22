import express from "express";
import isAuthantication from "../middlewares/isAuthinticated.js";
import upload from "../middlewares/multer.js";
import {
  deleteEvent,
  deleteQuestionPaper,
  deleteResult,
  editEvent,
  editQuestionPaper,
  editResult,
  getEvents,
  getQuestionPapers,
  getResults,
  uploadEvents,
  uploadQuestionPaper,
  uploadResult,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Result-related routes
router.post("results", isAuthantication, upload.single("post"), uploadResult); // Upload result
router.put("/results/:id", isAuthantication, editResult); // Edit a result
router.delete("/results/:id", isAuthantication, deleteResult); // Delete a result
router.get("/results", isAuthantication, getResults); // Fetch all results

// Question paper-related routes
router.post(
  "/question-papers",
  isAuthantication,
  upload.single("post"),
  uploadQuestionPaper
); // Upload question paper
router.put("/question-papers/:id", isAuthantication, editQuestionPaper); // Edit a question paper
router.delete("/question-papers/:id", isAuthantication, deleteQuestionPaper); // Delete a question paper
router.get("/question-papers", isAuthantication, getQuestionPapers); // Fetch all question papers

// Event-related routes
router.post("/events", isAuthantication, upload.single("post"), uploadEvents); // Upload event
router.put("/events/:id", isAuthantication, editEvent); // Edit an event
router.delete("/events/:id", isAuthantication, deleteEvent); // Delete an event
router.get("/events", isAuthantication, getEvents); // Fetch all events

export default router;
