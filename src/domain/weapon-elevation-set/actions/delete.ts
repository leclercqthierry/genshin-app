"use server";

import { makeWeaponElevationSetAdminService } from "@/services/supabase/weapon-elevation-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteWeaponElevationSetAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const weaponElevationSetAdminService = await makeWeaponElevationSetAdminService();

    return deleteWithHistory({
        id,
        getExisting: weaponElevationSetAdminService.getOne,
        deleteEntity: weaponElevationSetAdminService.remove,
        entityType: "WeaponElevationSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.rarity2Url,
            e.rarity3Url,
            e.rarity4Url,
            e.rarity5Url,
        ],
    });
}