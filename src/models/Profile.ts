import mongoose from "mongoose";
import { availableCryptoCurrencies, availableDivisia } from "../constants";

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  nickname: String,
  email: String,
  capital: Number,
  divisa: {
    type: String,
    enum: availableDivisia,
  },
  prefered_cryptocurrency: {
    type: String,
    enum: availableCryptoCurrencies,
  },
});

export const Profile = mongoose.model("Profile", schema);
