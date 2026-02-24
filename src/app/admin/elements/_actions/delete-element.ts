"use server";

import { deleteElement, getElement } from "@/services/supabase/element";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteElementAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: getElement,
        deleteEntity: deleteElement,
        entityType: "Element",
        entityName: (e) => e.name,
        deleteFiles: (e) => [e.iconUrl],
    });
}