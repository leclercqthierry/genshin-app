"use server";

import { WeaponElevationDungeonDropSetFormState } from "@/app/admin/weapon-elevation-dungeon-drop-sets/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";
import { weaponElevationDungeonDropSetSchema } from "../schema";
import { weaponElevationDungeonDropSetService } from '@/services/supabase/weapon-elevation-dungeon-drop-set';

export async function handleUpdate(
    id: number,
    _prev: WeaponElevationDungeonDropSetFormState,
    formData: FormData
): Promise<WeaponElevationDungeonDropSetFormState> {
    console.log("SERVER ACTION FORM DATA", Object.fromEntries(formData));

    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
            rarity4Url: formData.get("rarity4Url")?.toString() ?? "",
            rarity5Url: formData.get("rarity5Url")?.toString() ?? "",
            farmDaysIndex: Number(formData.get("farmDaysIndex")),
        },
        schema: weaponElevationDungeonDropSetSchema,
        getExisting: weaponElevationDungeonDropSetService.getOne,
        update: async (id, data) => {
            await weaponElevationDungeonDropSetService.update(id, {
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
        replaceFiles: (existing, data) => [
            [existing.rarity2Url, data.rarity2Url],
            [existing.rarity3Url, data.rarity3Url],
            [existing.rarity4Url, data.rarity4Url],
            [existing.rarity5Url, data.rarity5Url],
        ],
    });
}