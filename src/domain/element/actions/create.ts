"use server";

import { elementSchema } from "@/domain/element/schema";
import { elementService } from "@/services/supabase/element";
import type { ElementFormState } from "../../../app/admin/elements/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";

export async function handleCreate(
    _prevState: ElementFormState,
    formData: FormData
): Promise<ElementFormState> {
    return createWithHistory({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            iconUrl: formData.get("iconUrl")?.toString() ?? "",
        },
        schema: elementSchema,
        create: async (data) => {
            await elementService.create({
                name: data.name,
                icon_url: data.iconUrl,
            });
        },
        entityType: "Element",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [data.iconUrl],
    });
}