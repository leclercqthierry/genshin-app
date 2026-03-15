"use server";

import { DungeonDropSetFormState } from "@/app/admin/dungeon-drop-sets/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";
import { dungeonDropSetSchema } from "../schema";
import { dungeonDropSetService } from '@/services/supabase/dungeon-drop-set';

export async function handleUpdate(
    id: number,
    _prev: DungeonDropSetFormState,
    formData: FormData
): Promise<DungeonDropSetFormState> {
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
        },
        schema: dungeonDropSetSchema,
        getExisting: dungeonDropSetService.getOne,
        update: async (id, data) => {
            await dungeonDropSetService.update(id, {
                name: data.name,
                rarity2_url: data.rarity2_url,
                rarity3_url: data.rarity3_url,
                rarity4_url: data.rarity4_url,
            });
        },
        entityType: "DungeonDropSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.rarity2Url, data.rarity2_url],
            [existing.rarity3Url, data.rarity3_url],
            [existing.rarity4Url, data.rarity4_url]
        ],
    });
}