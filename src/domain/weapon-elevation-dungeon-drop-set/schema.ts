import { z } from "zod";
import { baseSetSchema } from "@/domain/shared/base-set/schema";

export const weaponElevationDungeonDropSetSchema = baseSetSchema.extend({
    rarity5_url: z.url("URL invalide"),
});

export type WeaponElevationDungeonDropSetSchema = z.infer<typeof weaponElevationDungeonDropSetSchema>;