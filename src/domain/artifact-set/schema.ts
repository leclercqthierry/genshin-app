import { z } from "zod";

export const artifactSetSchema = z.object({
    name: z
        .string()
        .min(1, "Le nom est requis.")
        .max(100, "Le nom ne peut pas dépasser 100 caractères."),
    iconFlowerUrl: z
        .url("URL d'image invalide."),
    iconPlumeUrl: z
        .url("URL d'image invalide."),
    iconCircletUrl: z
        .url("URL d'image invalide."),
    iconSandUrl: z
        .url("URL d'image invalide."),
    iconGobletUrl: z
        .url("URL d'image invalide."),
    rarityMax: z
        .number()
        .positive()
        .min(1)
        .max(5),
    bonus2P: z
        .string()
        .min(1, "Le bonus 2 pièces est requis.")
        .max(500, "Le bonus 2 pièces ne peut pas dépassés 500 caractères."),
    bonus4P: z
        .string()
        .min(1, "Le bonus 4 pièces est requis.")
        .max(1500, "Le bonus 4 pièces ne peut pas dépassés 1500 caractères.")
});

export type ArtifactSetSchema = z.infer<typeof artifactSetSchema>;