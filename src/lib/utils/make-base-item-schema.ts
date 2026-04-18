import { z } from "zod";

export const makeBaseItemSchema = (maxNameLength: number) =>
    z.object({
        name: z.string()
            .min(1, "Le nom est requis.")
            .max(maxNameLength, `Le nom ne peut pas dépasser ${maxNameLength} caractères.`),
        iconUrl: z.url("URL d'image invalide."),
    });