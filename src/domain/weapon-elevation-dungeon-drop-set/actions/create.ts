"use server";

import { weaponElevationDungeonDropSetSchema } from "@/domain/weapon-elevation-dungeon-drop-set/schema";
import { weaponElevationDungeonDropSetService } from "@/services/supabase/weapon-elevation-dungeon-drop-set";
import type { WeaponElevationDungeonDropSetFormState } from "@/app/admin/weapon-elevation-dungeon-drop-sets/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";
import { z } from "zod";

export async function handleCreate(
    _prevState: WeaponElevationDungeonDropSetFormState,
    formData: FormData
): Promise<WeaponElevationDungeonDropSetFormState> {
    return createWithHistory<z.infer<typeof weaponElevationDungeonDropSetSchema>>({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
            rarity4Url: formData.get("rarity4Url")?.toString() ?? "",
            rarity5Url: formData.get("rarity5Url")?.toString() ?? "",
            farmDaysIndex: formData.get("farmDaysIndex")?.toString() ?? "",
        },
        schema: weaponElevationDungeonDropSetSchema,
        create: async (data) => {
            await weaponElevationDungeonDropSetService.create({
                name: data.name,
                rarity2_url: data.rarity2Url,
                rarity3_url: data.rarity3Url,
                rarity4_url: data.rarity4Url,
                rarity5_url: data.rarity5Url,
                farm_days_index: data.farmDaysIndex,
            });
        },
        entityType: "WeaponElevationDungeonDropSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity2Url,
            data.rarity3Url,
            data.rarity4Url,
            data.rarity5Url,
        ],
    });
}