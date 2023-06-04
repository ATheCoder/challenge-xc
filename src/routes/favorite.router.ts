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
  let query = {};
  const { profile_id } = req.params;
  query = { profile_id };
  console.log(query);
  const data = await Favorite.find(query);
  res.json(data);
});
