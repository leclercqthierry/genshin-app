"use server";

import { localMaterialSchema } from "@/domain/local-material/schema";
import type { LocalMaterialFormState } from "@/app/admin/local-materials/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";
import { localMaterialService } from "@/services/supabase/local-material";

export async function handleCreate(
    _prevState: LocalMaterialFormState,
    formData: FormData
): Promise<LocalMaterialFormState> {
    return createWithHistory({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            icon_url: formData.get("icon_url")?.toString() ?? "",
        },
        schema: localMaterialSchema,
        create: async (data) => {
            await localMaterialService.create({
                name: data.name,
                icon_url: data.icon_url,
            });
        },
        entityType: "LocalMaterial",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [data.icon_url],
    });
}