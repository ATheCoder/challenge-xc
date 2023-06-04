import express from "express";
import { Favorite } from "../models/Favorite";

export const favoritesRouter = express.Router();

favoritesRouter.get("/", async (req, res) => {
  const favorite = await Favorite.find().lean();
  console.log(favorite);
  res.json({ favorite });
});

favoritesRouter.get("/:profile_id", async (req, res) => {
  console.log(req.params);
  const { profile_id } = req.params;
  const data = await Favorite.find({ profile_id });
  res.json(data);
});
