import express from "express";
import { Simulator } from "../models/Simulator";
import cors from "cors";
import { checkIfProfileIdExists } from "../services/profile.service";
import { createSimulatorSchema } from "../validators/simulator";

export const router = express.Router();

router.use(cors());

router.get("/api/simulator", async (req, res) => {
  const simulator = await Simulator.find().lean();
  console.log(simulator);
  res.json({ simulator });
});

router.get("/api/simulator/:profile_id", async (req, res) => {
  console.log("========== ");
  let query = {};
  const { profile_id } = req.params;
  console.log({ profile_id });
  query = { profile_id };
  const data = await Simulator.find(query);
  res.json(data);
});

router.post("/api/simulator/:profile_id", async (req, res, next) => {
  try {
    const { profile_id } = req.params;
    await checkIfProfileIdExists(profile_id);

    const createSimulatorData = createSimulatorSchema.parse(req.body);

    console.log(createSimulatorData);
    const simulator = await Simulator.create({
      ...createSimulatorData,
      profile_id,
    });
    res.json(simulator);
  } catch (e) {
    next(e);
  }
});
