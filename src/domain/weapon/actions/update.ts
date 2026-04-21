"use server";

import { weaponSchema } from "@/domain/weapon/schema";
import { makeWeaponAdminService } from "@/services/supabase/weapon";
import type { WeaponFormState } from "@/app/admin/weapons/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: WeaponFormState,
    formData: FormData
): Promise<WeaponFormState> {
    const weaponAdminService = await makeWeaponAdminService();
    return updateWithHistory({
        id,
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
            weaponElevationDungeonDropSetId: Number(formData.get("weaponElevationDungeonDropSetId")),
        },
        schema: weaponSchema,
        getExisting: weaponAdminService.getOne,
        update: async (id, data) => {
            await weaponAdminService.update(id, {
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
                weapon_elevation_dungeon_drop_set_id: data.weaponElevationDungeonDropSetId
            });
        },
        entityType: "Weapon",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.imageUrl, data.imageUrl],
            [existing.miniUrl, data.miniUrl],
        ],
    });
}