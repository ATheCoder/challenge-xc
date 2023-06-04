import express from "express";
import { CORS_ORIGINS } from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import { favoritesRouter } from "./routes/favorite.router";
import { router as profileRouter } from "./routes/profile.router";
import { router as simulatorRouter } from "./routes/simulator.router";
import { errorHandlerMiddleware } from "./services/errors";

export const app = express();

app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/favorite", favoritesRouter);
app.use(profileRouter);
app.use(simulatorRouter);
app.use(errorHandlerMiddleware);
