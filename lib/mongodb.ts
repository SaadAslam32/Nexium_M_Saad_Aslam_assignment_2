import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

// Validate connection string format
if (!MONGODB_URI.startsWith("mongodb://") && !MONGODB_URI.startsWith("mongodb+srv://")) {
  throw new Error(`
    Invalid MongoDB connection string: ${MONGODB_URI}
    Expected format: mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname?options
  `);
}
// Global is used here to prevent multiple connections during development
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// lib/mongodb.ts
async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "blogs",
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).catch((err: Error) => {
      console.error("MongoDB connection error:", err);
      throw new Error(`MongoDB connection failed: ${err.message}`);
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");
    return cached.conn;
  } catch (err) {
    // Reset cache on failure
    cached.promise = null;
    throw err;
  }
}

export default connectToDatabase;
