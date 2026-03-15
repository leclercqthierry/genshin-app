import { z } from "zod";

export const baseSetSchema = z.object({
    name: z.string().min(1, "Nom requis"),

    rarity2_url: z.url("URL invalide"),
    rarity3_url: z.url("URL invalide"),
    rarity4_url: z.url("URL invalide"),
});

export type BaseSetSchema = z.infer<typeof baseSetSchema>;