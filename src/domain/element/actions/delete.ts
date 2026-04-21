"use server";

import { makeElementAdminService } from "@/services/supabase/element";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteElementAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const elementAdminService = await makeElementAdminService();

    return deleteWithHistory({
        id,
        getExisting: elementAdminService.getOne,
        deleteEntity: elementAdminService.remove,
        entityType: "Element",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}