"use server";

import { eliteDropSetService } from "@/services/supabase/elite-drop-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteEliteDropSetAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: eliteDropSetService.getOne,
        deleteEntity: eliteDropSetService.remove,
        entityType: "EliteDropSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.rarity2Url,
            e.rarity3Url,
            e.rarity4Url,
        ],
    });
}