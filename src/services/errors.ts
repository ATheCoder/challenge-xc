import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export class InputError extends Error {
  path?: string[];

  constructor(message) {
    super(`Input Error: ${message}`);
  }
}

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (!err) {
    next();
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).send(err);
  }

  if (err.message.includes("Input Error: ")) {
    res.status(400).send(err.message);
  }
  next();
};
