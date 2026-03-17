import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);

    // Exit process with failure
    process.exit(1);
  }
};




export default connectDb;