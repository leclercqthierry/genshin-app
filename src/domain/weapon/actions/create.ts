"use server";

import { weaponSchema } from "@/domain/weapon/schema";
import type { WeaponFormState } from "@/app/admin/weapons/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";
import { z } from "zod";
import { makeWeaponAdminService } from "@/services/supabase/weapon";

export async function handleCreate(
    _prevState: WeaponFormState,
    formData: FormData
): Promise<WeaponFormState> {
    const weaponAdminService = await makeWeaponAdminService();
    return createWithHistory<z.infer<typeof weaponSchema>>({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            imageUrl: formData.get("imageUrl")?.toString() ?? "",
            miniUrl: formData.get("miniUrl")?.toString() ?? "",
            rarity: Number(formData.get("rarity")),
            weaponType: formData.get("weaponType")?.toString() ?? "",
            subStat: formData.get("subStat")?.toString() ?? "",
            source: formData.get("source")?.toString() ?? "",
            description: formData.get("description")?.toString() ?? "",
            eliteDropSetId: Number(formData.get("eliteDropSetId")),
            mobDropSetId: Number(formData.get("mobDropSetId")),
            weaponElevationSetId: Number(formData.get("weaponElevationSetId")),
        },
        schema: weaponSchema,
        create: async (data) => {
            await weaponAdminService.create({
                name: data.name,
                image_url: data.imageUrl,
                mini_url: data.miniUrl,
                rarity: data.rarity,
                weapon_type: data.weaponType,
                sub_stat: data.subStat,
                source: data.source,
                description: data.description,
                elite_drop_set_id: data.eliteDropSetId,
                mob_drop_set_id: data.mobDropSetId,
                weapon_elevation_set_id: data.weaponElevationSetId
            });
        },
        entityType: "Weapon",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.imageUrl,
            data.miniUrl,
        ],
    });
}