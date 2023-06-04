import { z } from "zod";

const availableCryptoCurrencies = ["eth", "bitcoin"] as const;

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
