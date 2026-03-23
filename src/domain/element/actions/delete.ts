"use server";

import { elementService } from "@/services/supabase/element";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteElementAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: elementService.getOne,
        deleteEntity: elementService.remove,
        entityType: "Element",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}