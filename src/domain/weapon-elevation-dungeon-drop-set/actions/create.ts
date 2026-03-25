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
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
            rarity5_url: formData.get("rarity5_url")?.toString() ?? "",
        },
        schema: weaponElevationDungeonDropSetSchema,
        create: async (data) => {
            await weaponElevationDungeonDropSetService.create({
                name: data.name,
                rarity2_url: data.rarity2_url,
                rarity3_url: data.rarity3_url,
                rarity4_url: data.rarity4_url,
                rarity5_url: data.rarity5_url,
            });
        },
        entityType: "WeaponElevationDungeonDropSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity2_url,
            data.rarity3_url,
            data.rarity4_url,
            data.rarity5_url,
        ],
    });
}