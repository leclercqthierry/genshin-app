"use server";

import { worldBossDropService } from "@/services/supabase/world-boss-drop";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteWorldBossDropAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: worldBossDropService.getOne,
        deleteEntity: worldBossDropService.remove,
        entityType: "WorldBossDrop",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}