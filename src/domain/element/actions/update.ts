"use server";

import { elementSchema } from "@/domain/element/schema";
import { elementService } from "@/services/supabase/element";
import type { ElementFormState } from "../../../app/admin/elements/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: ElementFormState,
    formData: FormData
): Promise<ElementFormState> {
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            icon_url: formData.get("icon_url")?.toString() ?? "",
        },
        schema: elementSchema,
        getExisting: elementService.getOne,
        update: async (id, data) => {
            await elementService.update(id, {
                name: data.name,
                icon_url: data.icon_url,
            });
        },
        entityType: "Element",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.iconUrl, data.icon_url],
        ],
    });
}