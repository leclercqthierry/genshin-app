import { baseItemSchema } from "../shared/base-item/schema";
import { z } from "zod";

export const bossDropSchema = baseItemSchema;
export type BossDropSchema = z.infer<typeof bossDropSchema>;