import { baseSetSchema } from "@/domain/shared/base-set/schema";
import { z } from "zod";

export const aptitudeSetSchema = baseSetSchema;

export type AptitudeSetSchema = z.infer<typeof aptitudeSetSchema>;