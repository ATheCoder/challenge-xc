import express from "express";
import { Profile } from "../models/Profile";
import { createProfileValidationSchema } from "../validators/profile";

export const router = express.Router();

router.get("/api/profile", async (req, res) => {
  const profile = await Profile.find().lean();
  console.log(profile);
  res.json({ profile });
});

router.post("/api/profile", async (req, res, next) => {
  try {
    const validatedBody = createProfileValidationSchema.parse(req.body);

    const { email, name, nickname } = validatedBody;

    let profile = await Profile.findOne({
      $or: [{ email }, { nickname }],
    }).exec();

    if (!profile) {
      profile = await Profile.create({ name, email, nickname });
    }

    res.json(profile);
  } catch (e) {
    next(e);
  }
});
