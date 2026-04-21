"use server";

import { makeWorldBossDropAdminService } from "@/services/supabase/world-boss-drop";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteWorldBossDropAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const worldBossDropAdminService = await makeWorldBossDropAdminService();

    return deleteWithHistory({
        id,
        getExisting: worldBossDropAdminService.getOne,
        deleteEntity: worldBossDropAdminService.remove,
        entityType: "WorldBossDrop",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}