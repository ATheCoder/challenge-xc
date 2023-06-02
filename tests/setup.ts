import mongoose from "mongoose";
import {
  disconnectMongoDBConnection,
  establishMongoDBConnection,
} from "../src/utils/db-connection";
import { insertSeedData } from "../src/utils/seed-insertor";

beforeAll(async () => {
  await establishMongoDBConnection();
  await mongoose.connection.db.dropDatabase();
  await insertSeedData();
});

afterAll(async () => {
  await disconnectMongoDBConnection();
});
