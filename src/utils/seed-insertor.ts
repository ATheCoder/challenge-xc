import mongoose from "mongoose";
import { Favorite } from "../models/Favorite";
import { Profile } from "../models/Profile";
import { Simulator } from "../models/Simulator";

export const insertSeedData = async () => {
  await mongoose.connection.db.dropDatabase();

  const profile = new Profile({
    name: `String`,
    email: `String`,
    capital: `123`,
    divisa: `String`,
    prefered_cryptocurrency: `String`,
  });
  const savedProfile = await profile.save();

  const idProfile = savedProfile._id;

  const simulator = new Simulator({
    profile_id: idProfile,
    name: `String`,
    start_date: `01/05/2021`,
    check_date: `01/05/2021`,
    cryptocurrency: `String`,
    divisa: `String`,
  });
  await simulator.save();

  const favorite = new Favorite({
    profile_id: idProfile,
    name: `String`,
    favorites: ["favorite1", "favorite2", "favorite3"],
  });
  await favorite.save();
};
