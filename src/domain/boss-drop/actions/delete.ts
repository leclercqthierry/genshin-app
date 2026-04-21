"use server";

import { makeBossDropAdminService } from "@/services/supabase/boss-drop";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteBossDropAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const bossDropAdminService = await makeBossDropAdminService();

    return deleteWithHistory({
        id,
        getExisting: bossDropAdminService.getOne,
        deleteEntity: bossDropAdminService.remove,
        entityType: "BossDrop",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}