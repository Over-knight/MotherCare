import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express';
import authRoutes from './routes/authRoutes';


const app = express();

const PORT = process.env.PORT || 3000;
// Ensure MongoDB URI exists
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("⚠️ MONGO_URI is not defined in .env file!");
  process.exit(1);
}

// if (require.main === module) {

// }
// MongoDB Connection
(async () => {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    } as mongoose.ConnectOptions);
    console.log("Successfully connected to MongoDB!");

    // Start the server only after MongoDB connection is successful
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
})();