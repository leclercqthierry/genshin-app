import { baseSetSchema } from "@/domain/shared/base-set/schema";
import { z } from "zod";

export const dungeonDropSetSchema = baseSetSchema;

export type DungeonDropSetSchema = z.infer<typeof dungeonDropSetSchema>;