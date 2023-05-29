import mongoose from "mongoose";
import { DBURL } from "../config";
import { insertSeedData } from "../utils/seed-insertor";

(async () => {
  await mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await insertSeedData();

  await mongoose.disconnect();
})();
