import mongoose from "mongoose";
import { DBURL } from "../config";

export const establishMongoDBConnection = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB!");
    } catch (e) {
      console.error("Failed to connect to MongoDB", e);
    }
  } else if (mongoose.connection.readyState === 1) {
    console.log("MongoDB connection is already established!");
  } else if (mongoose.connection.readyState === 2) {
    console.log("A connection is already being established with MongoDB.");
  }
};

export const disconnectMongoDBConnection = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
};
