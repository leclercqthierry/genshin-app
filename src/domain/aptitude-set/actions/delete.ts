"use server";

import { makeAptitudeSetAdminService } from "@/services/supabase/aptitude-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteAptitudeSetAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const aptitudeSetAdminService = await makeAptitudeSetAdminService();

    return deleteWithHistory({
        id,
        getExisting: aptitudeSetAdminService.getOne,
        deleteEntity: aptitudeSetAdminService.remove,
        entityType: "AptitudeSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.rarity2Url,
            e.rarity3Url,
            e.rarity4Url,
        ],
    });
}