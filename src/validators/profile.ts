import { z } from "zod";

export const createProfileValidationSchema = z
  .object({
    email: z.string().email().toLowerCase(),
    name: z.string(),
    nickname: z.string().toLowerCase(),
  })
  .required()
  .strip();
