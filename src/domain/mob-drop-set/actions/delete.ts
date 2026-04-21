"use server";

import { makeMobDropSetAdminService } from "@/services/supabase/mob-drop-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteMobDropSetAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const mobDropSetAdminService = await makeMobDropSetAdminService();

    return deleteWithHistory({
        id,
        getExisting: mobDropSetAdminService.getOne,
        deleteEntity: mobDropSetAdminService.remove,
        entityType: "AptitudeDungeonDropSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.rarity1Url,
            e.rarity2Url,
            e.rarity3Url,
        ],
    });
}