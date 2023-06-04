import { z } from "zod";
import { availableCryptoCurrencies, availableDivisia } from "../constants";

export const createSimulatorSchema = z
  .object({
    cryptocurrency: z.enum(availableCryptoCurrencies),
    divisa: z.enum(availableDivisia),
    price: z.number(),
    quantity: z.number(),
  })
  .required()
  .transform((data) => {
    return { ...data, dateRecorded: new Date() };
  });
