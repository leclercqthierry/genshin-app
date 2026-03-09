"use server";

import { localMaterialSchema } from "@/domain/local-material/schema";
import { getLocalMaterial, updateLocalMaterial } from "@/services/supabase/local-material";
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
            icon_url: formData.get("icon_url")?.toString() ?? "",
        },
        schema: localMaterialSchema,
        getExisting: getLocalMaterial,
        update: async (id, data) => {
            await updateLocalMaterial(id, {
                name: data.name,
                iconUrl: data.icon_url,
            });
        },
        entityType: "LocalMaterial",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.iconUrl, data.icon_url],
        ],
    });
}