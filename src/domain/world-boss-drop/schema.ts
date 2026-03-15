import { baseItemSchema } from "../shared/base-item/schema";
import { z } from "zod";

export const worldBossDropSchema = baseItemSchema;
export type WorldBossDropSchema = z.infer<typeof worldBossDropSchema>;