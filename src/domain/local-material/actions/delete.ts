"use server";

import { makeLocalMaterialAdminService } from "@/services/supabase/local-material";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteLocalMaterialAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const localMaterialAdminService = await makeLocalMaterialAdminService();

    return deleteWithHistory({
        id,
        getExisting: localMaterialAdminService.getOne,
        deleteEntity: localMaterialAdminService.remove,
        entityType: "LocalMaterial",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}