"use server";

import { deleteBossDrop, getBossDrop } from "@/services/supabase/boss-drop";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteBossDropAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: getBossDrop,
        deleteEntity: deleteBossDrop,
        entityType: "BossDrop",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}