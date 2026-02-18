import { z } from "zod";

export const elementSchema = z.object({
    name: z
        .string()
        .min(1, "Le nom est requis.")
        .max(50, "Le nom ne peut pas dépasser 50 caractères."),

    icon_url: z
        .url("URL d'image invalide."),
});

export type ElementSchema = z.infer<typeof elementSchema>;