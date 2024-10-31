import { Event } from "../modules/event.model.js";
import { Question } from "../modules/question.model.js";
import { Result } from "../modules/result.model.js";
import { User } from "../modules/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import datauri from "../utils/datauri.js";

export const uploadResult = async (req, res) => {
  try {
    console.log("object");
    const userId = req.id;
    const { year, branch, kt, sem, reval } = req.body;
    const post = req.file;
    const admin = await User.findById(userId);
    if (admin.isadmin) {
      const dataUri = datauri(post);
      let cloudResponce = await cloudinary.uploader.upload(dataUri, {
        resource_type: "auto",
      });
      console.log(cloudResponce);
      const uploadResult = await Result.create({
        author: userId,
        result: cloudResponce.secure_url,
        title: `${branch} result ${year}`,
        year,
        sem,
        branch,
        kt,
        reval,
        cloudpostname: cloudResponce.display_name,
      });
      console.log(uploadResult);
      return res.status(200).json({
        message: "Result uploaded",
        success: true,
        uploadResult,
      });
    }
    return res.status(500).json({
      message: "you are not admin",
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editResult = async (req, res) => {
  try {
    const userId = req.id;
    const { year, branch, kt, sem, reval } = req.body;
    const resultId = req.params.id;
    console.log(year);
    const admin = await User.findById(userId);
    const result = await Result.findById(resultId);
    if (admin.isadmin) {
      if (year) result.year = year;
      if (branch) result.branch = branch;
      if (sem) result.sem = sem;
      if (kt) result.kt = kt;
      if (reval) result.reval = reval;
      await result.save();
      return res.status(200).json({
        message: "Done Update",
        success: true,
      });
    }
    return res.status(400).json({
      message: "you are not admine",
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteResult = async (req, res) => {
  try {
    const userId = req.id;
    const resultId = req.params.id;
    const admin = await User.findById(userId);
    const result = await Result.findByIdAndDelete(resultId);
    if (admin.isadmin) {
      cloudinary.api.delete_resources([result.cloudpostname]);
      result.cloudpostname;
      return res.status(200).json({
        message: "Delete Result",
        success: true,
      });
    }
    return res.status(200).json({
      message: "you are not admin",
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getResults = async (req, res) => {
  try {
    const userId = req.id;
    const results = await Result.find();
    if (results) {
      return res.status(200).json({
        message: "All Results",
        success: true,
        results,
      });
    }
    return res.status(400).json({
      message: "result is not their",
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadQuestionPaper = async (req, res) => {
  try {
    const userId = req.id;
    const { year, branch, kt, sem } = req.body;
    console.log(year, branch, kt, sem);
    const post = req.file;
    const admin = await User.findById(userId);
    if (admin.isadmin) {
      const dataUri = datauri(post);
      let cloudResponce = await cloudinary.uploader.upload(dataUri, {
        resource_type: "auto",
      });
      const uploadQuestionPaper = await Question.create({
        author: userId,
        questionpaper: cloudResponce.secure_url,
        title: `${branch} question paper ${year}`,
        year,
        sem,
        branch,
        kt,
        cloudpostname: cloudResponce.display_name,
      });

      return res.status(200).json({
        message: "Question Paper uploaded",
        success: true,
        uploadQuestionPaper,
      });
    }
    return res.status(500).json({
      message: "you are not admin",
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionPapers = async (req, res) => {
  try {
    const userId = req.id;
    const results = await Question.find();
    if (results) {
      return res.status(200).json({
        message: "All Results",
        success: true,
        results,
      });
    }
    return res.status(400).json({
      message: "result is not their",
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};
export const editQuestionPaper = async (req, res) => {
  try {
    const userId = req.id;
    const { year, branch, kt, sem } = req.body;
    const questionpaperId = req.params.id;
    console.log(year);
    const admin = await User.findById(userId);
    const questionpaper = await Question.findById(questionpaperId);
    if (admin.isadmin) {
      if (year) result.year = year;
      if (branch) result.branch = branch;
      if (sem) result.sem = sem;
      if (kt) result.kt = kt;
      await result.save();
      return res.status(200).json({
        message: "Done Update",
        success: true,
        questionpaper,
      });
    }
    return res.status(400).json({
      message: "you are not admine",
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestionPaper = async (req, res) => {
  try {
    const userId = req.id;
    const questionpaperId = req.params.id;
    const admin = await User.findById(userId);
    const questionpaper = await Question.findByIdAndDelete(questionpaperId);
    if (admin.isadmin) {
      cloudinary.api.delete_resources([questionpaper.cloudpostname]);
      questionpaper.cloudpostname;
      return res.status(200).json({
        message: "Delete Result",
        success: true,
      });
    }
    return res.status(200).json({
      message: "you are not admin",
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadEvents = async (req, res) => {
  try {
    const userId = req.id;
    const { description, lastdate } = req.body; // Now accepting lastdate
    const post = req.file;
    console.log("object");
    const admin = await User.findById(userId);

    if (admin.isadmin) {
      const dataUri = datauri(post); // Changed from `result` to `event`
      let cloudResponce = await cloudinary.uploader.upload(dataUri, {
        resource_type: "auto",
      });

      // Upload the event to the database
      const uploadEvent = await Event.create({
        author: userId,
        event: cloudResponce.secure_url,
        description,
        cloudpostname: cloudResponce.public_id, // public_id is used for deletion from Cloudinary
      });

      // Calculate the difference between the current date and the provided lastdate
      const currentDate = new Date();
      const eventLastDate = new Date(lastdate);
      const timeDifference = eventLastDate.getTime() - currentDate.getTime();

      if (timeDifference > 0) {
        console.log(timeDifference);
        // Schedule deletion after the event ends (based on lastdate)
        setTimeout(async () => {
          try {
            // Delete the file from Cloudinary
            await cloudinary.uploader.destroy(cloudResponce.public_id);

            // Delete the event from the database
            await Event.findByIdAndDelete(uploadEvent._id);

            console.log(
              `Event ${uploadEvent.title} deleted successfully after the last date: ${lastdate}.`
            );
          } catch (deleteError) {
            console.log(
              `Error deleting event ${uploadEvent.title}:`,
              deleteError
            );
          }
        }, timeDifference); // Scheduling deletion after timeDifference milliseconds
      }

      return res.status(200).json({
        message: "Event uploaded and scheduled for deletion",
        success: true,
        uploadEvent,
      });
    }

    return res.status(500).json({
      message: "You are not admin",
      success: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const editEvent = async (req, res) => {
  try {
    const userId = req.id;
    const { formlink, description, lastdate } = req.body; // Accepting updated details
    const eventId = req.params.id; // Event ID from request parameters
    const admin = await User.findById(userId);

    if (admin.isadmin) {
      // Find the event to be edited
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({
          message: "Event not found",
          success: false,
        });
      }

      // Update the event details if they exist in the request body
      if (formlink) event.formlink = formlink;
      if (description) event.description = description;
      if (lastdate) event.lastdate = lastdate;

      // Save the updated event
      await event.save();

      // If lastdate is updated, reschedule the deletion
      if (lastdate) {
        // Calculate the difference between the current date and the updated lastdate
        const currentDate = new Date();
        const eventLastDate = new Date(lastdate);
        const timeDifference = eventLastDate.getTime() - currentDate.getTime();

        if (timeDifference > 0) {
          // Cancel any previous deletion schedules, if applicable
          // (This assumes you are using some cron or timeout ID to track it; update as necessary)

          // Reschedule the deletion
          setTimeout(async () => {
            try {
              console.log(timeDifference);

              // Delete the file from Cloudinary
              await cloudinary.uploader.destroy(event.cloudpostname);

              // Delete the event from the database
              await Event.findByIdAndDelete(eventId);

              console.log(
                `Event ${event.title} deleted successfully after the updated last date: ${lastdate}.`
              );
            } catch (deleteError) {
              console.log(`Error deleting event ${event.title}:`, deleteError);
            }
          }, timeDifference); // Reschedule based on the new lastdate
        }
      }

      return res.status(200).json({
        message: "Event updated successfully",
        success: true,
        event,
      });
    }

    return res.status(403).json({
      message: "You are not admin",
      success: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const userId = req.id;
    const eventId = req.params.id; // Event ID from request parameters
    const admin = await User.findById(userId);

    if (admin.isadmin) {
      // Find the event by its ID
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({
          message: "Event not found",
          success: false,
        });
      }

      // Delete the event from Cloudinary
      await cloudinary.uploader.destroy(event.cloudpostname);

      // Delete the event from the database
      await Event.findByIdAndDelete(eventId);

      return res.status(200).json({
        message: `Event ${event.title} deleted successfully`,
        success: true,
      });
    }

    return res.status(403).json({
      message: "You are not admin",
      success: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({})
      .sort({ createdAt: -1 }) // Sorting posts by creation date
      .populate({
        path: "author",
        select: "profilePic username year", // Correcting the select field
      });
    return res.status(200).json({
      message: "All Events",
      success: true,
      events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
