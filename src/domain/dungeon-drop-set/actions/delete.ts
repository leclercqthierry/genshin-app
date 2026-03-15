"use server";

import { dungeonDropSetService } from "@/services/supabase/dungeon-drop-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteDungeonDropSetAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: dungeonDropSetService.getOne,
        deleteEntity: dungeonDropSetService.remove,
        entityType: "DungeonDropSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.rarity2Url,
            e.rarity3Url,
            e.rarity4Url,
        ],
    });
}