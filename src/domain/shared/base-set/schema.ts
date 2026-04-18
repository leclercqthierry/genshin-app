import { z } from "zod";

export const baseSetSchema = z.object({
    name: z.string().min(1, "Nom requis"),

    rarity2Url: z.url("URL invalide"),
    rarity3Url: z.url("URL invalide"),
    rarity4Url: z.url("URL invalide"),
});

export type BaseSetSchema = z.infer<typeof baseSetSchema>;