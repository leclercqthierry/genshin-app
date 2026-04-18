"use server";

import { AptitudeDungeonDropSetFormState } from "@/app/admin/aptitude-dungeon-drop-sets/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";
import { aptitudeDungeonDropSetSchema } from "../schema";
import { aptitudeDungeonDropSetService } from '@/services/supabase/aptitude-dungeon-drop-set';

export async function handleUpdate(
    id: number,
    _prev: AptitudeDungeonDropSetFormState,
    formData: FormData
): Promise<AptitudeDungeonDropSetFormState> {
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
            rarity4Url: formData.get("rarity4Url")?.toString() ?? "",
        },
        schema: aptitudeDungeonDropSetSchema,
        getExisting: aptitudeDungeonDropSetService.getOne,
        update: async (id, data) => {
            await aptitudeDungeonDropSetService.update(id, {
                name: data.name,
                rarity2_url: data.rarity2Url,
                rarity3_url: data.rarity3Url,
                rarity4_url: data.rarity4Url,
            });
        },
        entityType: "AptitudeDungeonDropSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.rarity2Url, data.rarity2Url],
            [existing.rarity3Url, data.rarity3Url],
            [existing.rarity4Url, data.rarity4Url]
        ],
    });
}