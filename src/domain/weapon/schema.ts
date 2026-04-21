import { RARITIES } from "@/constants/rarities";
import { SOURCES } from "@/constants/sources";
import { WEAPON_SUBSTATS } from "@/constants/weapon-substats";
import { WEAPON_TYPES } from "@/constants/weapon-types";
import { z } from "zod";

const rarityMin = Math.min(...RARITIES);
const rarityMax = Math.max(...RARITIES);

export const weaponSchema = z.object({
    name: z
        .string()
        .min(1, "Le nom est requis.")
        .max(100, "Le nom ne peut pas dépasser 100 caractères."),
    imageUrl: z
        .url("URL d'image d'arme invalide."),
    miniUrl: z
        .url("URL d'image miniature d'arme invalide."),
    rarity: z
        .number()
        .min(rarityMin, "rareté minimale invalide")
        .max(rarityMax, "rareté maximale invalide"),
    weaponType: z.enum(WEAPON_TYPES),
    subStat: z.enum(WEAPON_SUBSTATS),
    source: z.enum(SOURCES),
    mobDropSetId: z.number().int().positive("Set de drops de mobs requis"),
    eliteDropSetId: z.number().int().positive("Set de drops élite requis"),
    weaponElevationSetId: z.number().int().positive("Set de drops de donjon d'élévation d'arme requis"),
    description: z.string().min(1, "description requise").max(1000, "La description ne peut pas dépasser 1000 caractères"),
});

export type WeaponSchema = z.infer<typeof weaponSchema>;