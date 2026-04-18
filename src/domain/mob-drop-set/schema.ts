import { z } from "zod";

export const mobDropSetSchema = z.object({
    name: z.string().min(1, "Nom requis"),

    rarity1Url: z.url("URL invalide"),
    rarity2Url: z.url("URL invalide"),
    rarity3Url: z.url("URL invalide"),
});

export type MobDropSetSchema = z.infer<typeof mobDropSetSchema>;