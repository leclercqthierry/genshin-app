import { z } from "zod";
import { baseSetSchema } from "@/domain/shared/base-set/schema";
import { FARM_DAYS } from "@/constants/farm-days";

const max = FARM_DAYS.length;

export const weaponElevationDungeonDropSetSchema = baseSetSchema.extend({
    rarity5Url: z.url("URL invalide"),
    farmDaysIndex: z
        .number()
        .int()
        .min(0, "Jours de farm requis")
        .max(max - 1, "Jours de farm invalide"),
});

export type WeaponElevationDungeonDropSetSchema = z.infer<typeof weaponElevationDungeonDropSetSchema>;