"use server";

import { weaponElevationDungeonDropSetService } from "@/services/supabase/weapon-elevation-dungeon-drop-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteWeaponElevationDungeonDropSetAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: weaponElevationDungeonDropSetService.getOne,
        deleteEntity: weaponElevationDungeonDropSetService.remove,
        entityType: "WeaponElevationDungeonDropSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.rarity2Url,
            e.rarity3Url,
            e.rarity4Url,
            e.rarity5Url,
        ],
    });
}