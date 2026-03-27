import { baseSetSchema } from "@/domain/shared/base-set/schema";
import { z } from "zod";

export const eliteDropSetSchema = baseSetSchema;

export type EliteDropSetSchema = z.infer<typeof eliteDropSetSchema>;