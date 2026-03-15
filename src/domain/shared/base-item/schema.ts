import { z } from "zod";

export const baseItemSchema = z.object({
    name: z
        .string()
        .min(1, "Le nom est requis.")
        .max(100, "Le nom ne peut pas dépasser 100 caractères."),

    icon_url: z.url("URL d'image invalide."),
});

export type BaseItemSchema = z.infer<typeof baseItemSchema>;