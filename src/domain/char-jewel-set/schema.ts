import { z } from "zod";

export const charJewelSetSchema = z.object({
    name: z.string().min(1, "Nom requis"),
    elementId: z.number().int().positive("Élément requis"),
    rarity2_url: z.url(),
    rarity3_url: z.url(),
    rarity4_url: z.url(),
    rarity5_url: z.url(),
});

export type CharJewelSetSchema = z.infer<typeof charJewelSetSchema>;