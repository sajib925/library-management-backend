import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DB_URL as string;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
