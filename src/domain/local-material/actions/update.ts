"use server";

import { localMaterialSchema } from "@/domain/local-material/schema";
import { makeLocalMaterialAdminService } from "@/services/supabase/local-material";
import type { LocalMaterialFormState } from "@/app/admin/local-materials/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: LocalMaterialFormState,
    formData: FormData
): Promise<LocalMaterialFormState> {

    const localMaterialAdminService = await makeLocalMaterialAdminService();
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            iconUrl: formData.get("iconUrl")?.toString() ?? "",
        },
        schema: localMaterialSchema,
        getExisting: localMaterialAdminService.getOne,
        update: async (id, data) => {
            await localMaterialAdminService.update(id, {
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