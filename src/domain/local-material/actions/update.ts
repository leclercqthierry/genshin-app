"use server";

import { localMaterialSchema } from "@/domain/local-material/schema";
import { localMaterialService } from "@/services/supabase/local-material";
import type { LocalMaterialFormState } from "@/app/admin/local-materials/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: LocalMaterialFormState,
    formData: FormData
): Promise<LocalMaterialFormState> {
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            iconUrl: formData.get("iconUrl")?.toString() ?? "",
        },
        schema: localMaterialSchema,
        getExisting: localMaterialService.getOne,
        update: async (id, data) => {
            await localMaterialService.update(id, {
                name: data.name,
                icon_url: data.iconUrl,
            });
        },
        entityType: "LocalMaterial",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.iconUrl, data.iconUrl],
        ],
    });
}