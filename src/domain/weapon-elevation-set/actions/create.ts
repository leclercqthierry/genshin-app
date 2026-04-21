"use server";

import { weaponElevationSetSchema } from "@/domain/weapon-elevation-set/schema";
import { makeWeaponElevationSetAdminService } from "@/services/supabase/weapon-elevation-set";
import type { WeaponElevationSetFormState } from "@/app/admin/weapon-elevation-sets/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";
import { z } from "zod";

export async function handleCreate(
    _prevState: WeaponElevationSetFormState,
    formData: FormData
): Promise<WeaponElevationSetFormState> {
    const weaponElevationSetAdminService = await makeWeaponElevationSetAdminService();
    return createWithHistory<z.infer<typeof weaponElevationSetSchema>>({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
            rarity4Url: formData.get("rarity4Url")?.toString() ?? "",
            rarity5Url: formData.get("rarity5Url")?.toString() ?? "",
            farmDaysIndex: formData.get("farmDaysIndex")?.toString() ?? "",
        },
        schema: weaponElevationSetSchema,
        create: async (data) => {
            await weaponElevationSetAdminService.create({
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
        cleanupFiles: (data) => [
            data.rarity2Url,
            data.rarity3Url,
            data.rarity4Url,
            data.rarity5Url,
        ],
    });
}