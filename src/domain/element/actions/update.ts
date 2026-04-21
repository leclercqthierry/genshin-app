"use server";

import { elementSchema } from "@/domain/element/schema";
import { makeElementAdminService } from "@/services/supabase/element";
import type { ElementFormState } from "../../../app/admin/elements/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: ElementFormState,
    formData: FormData
): Promise<ElementFormState> {

    const elementAdminService = await makeElementAdminService();
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            iconUrl: formData.get("iconUrl")?.toString() ?? "",
        },
        schema: elementSchema,
        getExisting: elementAdminService.getOne,
        update: async (id, data) => {
            await elementAdminService.update(id, {
                name: data.name,
                icon_url: data.iconUrl,
            });
        },
        entityType: "Element",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.iconUrl, data.iconUrl],
        ],
    });
}