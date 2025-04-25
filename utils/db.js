import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri =
      "mongodb+srv://aadichaurasia00:TzKHfQvFbKm5AG6t@cluster0.iihmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    // Ensure the URI is available
    if (!uri) {
      throw new Error(
        "MongoDB URI is missing. Check your environment variables."
      );
    }

    // Log the URI for debugging (Remove in production)
    console.log("Connecting to Database");

    // Connect without deprecated options
    await mongoose.connect(uri);

    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
