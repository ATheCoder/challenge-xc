import mongoose from "mongoose";
import { availableCryptoCurrencies, availableDivisia } from "../constants";

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  nickname: String,
  email: String,
  capital: { type: Number, default: 0 },
  divisa: {
    type: String,
    enum: availableDivisia,
    default: "USD",
  },
  prefered_cryptocurrency: {
    type: String,
    enum: availableCryptoCurrencies,
  },
});

export const Profile = mongoose.model("Profile", schema);
