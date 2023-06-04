import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema(
  {
    profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    name: String,
    favorites: [String],
  },
  {
    timestamps: true,
  }
);

export const Favorite = mongoose.model("Favorite", schema);
