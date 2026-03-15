"use server";

import { bossDropService } from "@/services/supabase/boss-drop";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteBossDropAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: bossDropService.getOne,
        deleteEntity: bossDropService.remove,
        entityType: "BossDrop",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}