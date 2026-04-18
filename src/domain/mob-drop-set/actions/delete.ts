"use server";

import { mobDropSetService } from "@/services/supabase/mob-drop-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteMobDropSetAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: mobDropSetService.getOne,
        deleteEntity: mobDropSetService.remove,
        entityType: "AptitudeDungeonDropSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.rarity1Url,
            e.rarity2Url,
            e.rarity3Url,
        ],
    });
}