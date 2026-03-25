import { baseSetSchema } from "@/domain/shared/base-set/schema";
import { z } from "zod";

export const aptitudeDungeonDropSetSchema = baseSetSchema;

export type AptitudeDungeonDropSetSchema = z.infer<typeof aptitudeDungeonDropSetSchema>;