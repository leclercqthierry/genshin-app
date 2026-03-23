import { z } from "zod";

export const artifactSetSchema = z.object({
    name: z
        .string()
        .min(1, "Le nom est requis.")
        .max(100, "Le nom ne peut pas dépasser 100 caractères."),
    icon_flower_url: z
        .url("URL d'image invalide."),
    icon_plume_url: z
        .url("URL d'image invalide."),
    icon_circlet_url: z
        .url("URL d'image invalide."),
    icon_sand_url: z
        .url("URL d'image invalide."),
    icon_goblet_url: z
        .url("URL d'image invalide."),
    rarity_max: z
        .number()
        .positive()
        .min(1)
        .max(5),
    bonus_2P: z
        .string()
        .min(1, "Le bonus 2 pièces est requis.")
        .max(500, "Le bonus 2 pièces ne peut pas dépassés 500 caractères."),
    bonus_4P: z
        .string()
        .min(1, "Le bonus 4 pièces est requis.")
        .max(1500, "Le bonus 4 pièces ne peut pas dépassés 1500 caractères.")
});

export type ArtifactSetSchema = z.infer<typeof artifactSetSchema>;