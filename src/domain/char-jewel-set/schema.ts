import { z } from "zod";
import { baseSetSchema } from "@/domain/shared/base-set/schema";

export const charJewelSetSchema = baseSetSchema.extend({
    elementId: z.number().int().positive("Élément requis"),
    rarity5Url: z.url("URL invalide"),
});

export type CharJewelSetSchema = z.infer<typeof charJewelSetSchema>;