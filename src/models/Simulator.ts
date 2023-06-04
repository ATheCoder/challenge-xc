import mongoose from "mongoose";
import { availableCryptoCurrencies, availableDivisia } from "../constants";

const { Schema } = mongoose;

const schema = new Schema(
  {
    profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    dateRecorded: Date,
    cryptocurrency: {
      type: String,
      enum: availableCryptoCurrencies,
    },
    divisa: {
      type: String,
      enum: availableDivisia,
    },
    price: Number, // This is the price of 1 unit of cryptocurrency in divisia units
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

export const Simulator = mongoose.model("Simulator", schema);
