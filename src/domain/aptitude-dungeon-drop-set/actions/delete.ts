"use server";

import { aptitudeDungeonDropSetService } from "@/services/supabase/aptitude-dungeon-drop-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteAptitudeDungeonDropSetAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: aptitudeDungeonDropSetService.getOne,
        deleteEntity: aptitudeDungeonDropSetService.remove,
        entityType: "AptitudeDungeonDropSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.rarity2Url,
            e.rarity3Url,
            e.rarity4Url,
        ],
    });
}