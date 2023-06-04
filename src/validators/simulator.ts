import { z } from "zod";
import { availableCryptoCurrencies } from "../constants";

export const createSimulatorSchema = z
  .object({
    cryptocurrency: z.enum(availableCryptoCurrencies),
    euros: z.number(),
    price: z.number(),
    quantity: z.number(),
  })
  .required()
  .transform((data) => {
    return { ...data, dateRecorded: new Date() };
  });
