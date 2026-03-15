import { z } from "zod";
import { baseItemSchema } from "../shared/base-item/schema";

export const localMaterialSchema = baseItemSchema;
export type LocalMaterialSchema = z.infer<typeof localMaterialSchema>;