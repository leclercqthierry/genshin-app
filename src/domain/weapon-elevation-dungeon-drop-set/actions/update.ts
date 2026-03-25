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
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
            rarity5_url: formData.get("rarity5_url")?.toString() ?? "",
        },
        schema: weaponElevationDungeonDropSetSchema,
        getExisting: weaponElevationDungeonDropSetService.getOne,
        update: async (id, data) => {
            await weaponElevationDungeonDropSetService.update(id, {
                name: data.name,
                rarity2_url: data.rarity2_url,
                rarity3_url: data.rarity3_url,
                rarity4_url: data.rarity4_url,
                rarity5_url: data.rarity5_url,
            });
        },
        entityType: "WeaponElevationDungeonDropSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.rarity2Url, data.rarity2_url],
            [existing.rarity3Url, data.rarity3_url],
            [existing.rarity4Url, data.rarity4_url],
            [existing.rarity5Url, data.rarity5_url],
        ],
    });
}