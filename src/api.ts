import express, { ErrorRequestHandler } from "express";
import { CORS_ORIGINS } from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import { favoritesRouter } from "./routes/favorite.router";
import { router as profileRouter } from "./routes/profile.router";
import { router as simulatorRouter } from "./routes/simulator.router";
import { ZodError } from "zod";

export const app = express();

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).send(err);
  }
  next();
};

app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/favorite", favoritesRouter);
app.use(profileRouter);
app.use(simulatorRouter);
app.use(errorHandlerMiddleware);
