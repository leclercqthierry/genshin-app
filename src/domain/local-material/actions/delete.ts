"use server";

import { deleteLocalMaterial, getLocalMaterial } from "@/services/supabase/local-material";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteLocalMaterialAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: getLocalMaterial,
        deleteEntity: deleteLocalMaterial,
        entityType: "LocalMaterial",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}