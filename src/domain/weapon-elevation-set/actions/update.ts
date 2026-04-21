"use server";

import { WeaponElevationSetFormState } from "@/app/admin/weapon-elevation-sets/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";
import { weaponElevationSetSchema } from "../schema";
import { makeWeaponElevationSetAdminService } from "@/services/supabase/weapon-elevation-set";

export async function handleUpdate(
    id: number,
    _prev: WeaponElevationSetFormState,
    formData: FormData
): Promise<WeaponElevationSetFormState> {
    const weaponElevationSetAdminService = await makeWeaponElevationSetAdminService();

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
        schema: weaponElevationSetSchema,
        getExisting: weaponElevationSetAdminService.getOne,
        update: async (id, data) => {
            await weaponElevationSetAdminService.update(id, {
                name: data.name,
                rarity2_url: data.rarity2Url,
                rarity3_url: data.rarity3Url,
                rarity4_url: data.rarity4Url,
                rarity5_url: data.rarity5Url,
                farm_days_index: data.farmDaysIndex,
            });
        },
        entityType: "WeaponElevationSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.rarity2Url, data.rarity2Url],
            [existing.rarity3Url, data.rarity3Url],
            [existing.rarity4Url, data.rarity4Url],
            [existing.rarity5Url, data.rarity5Url],
        ],
    });
}