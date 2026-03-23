import { z } from "zod";
import { makeBaseItemSchema } from "@/lib/utils/make-base-item-schema";

export const elementSchema = makeBaseItemSchema(50);

export type ElementSchema = z.infer<typeof elementSchema>;