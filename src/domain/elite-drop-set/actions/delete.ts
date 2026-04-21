"use server";

import { makeEliteDropSetAdminService } from "@/services/supabase/elite-drop-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteEliteDropSetAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const eliteDropSetAdminService = await makeEliteDropSetAdminService();

    return deleteWithHistory({
        id,
        getExisting: eliteDropSetAdminService.getOne,
        deleteEntity: eliteDropSetAdminService.remove,
        entityType: "EliteDropSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.rarity2Url,
            e.rarity3Url,
            e.rarity4Url,
        ],
    });
}