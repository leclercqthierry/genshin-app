"use server";

import { deleteWorldBossDrop, getWorldBossDrop } from "@/services/supabase/world-boss-drop";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteWorldBossDropAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: getWorldBossDrop,
        deleteEntity: deleteWorldBossDrop,
        entityType: "WorldBossDrop",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}