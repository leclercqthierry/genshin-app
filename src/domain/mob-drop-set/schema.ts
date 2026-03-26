import { z } from "zod";

export const mobDropSetSchema = z.object({
    name: z.string().min(1, "Nom requis"),

    rarity1_url: z.url("URL invalide"),
    rarity2_url: z.url("URL invalide"),
    rarity3_url: z.url("URL invalide"),
});

export type MobDropSetSchema = z.infer<typeof mobDropSetSchema>;