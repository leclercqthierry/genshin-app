import { makeBaseItemSchema } from "@/lib/utils/make-base-item-schema";
import { z } from "zod";

export const baseItemSchema = makeBaseItemSchema(100);

export type BaseItemSchema = z.infer<typeof baseItemSchema>;