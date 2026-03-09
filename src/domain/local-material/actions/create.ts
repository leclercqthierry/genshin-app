"use server";

import { localMaterialSchema } from "@/domain/local-material/schema";
import { createLocalMaterial } from "@/services/supabase/local-material";
import type { LocalMaterialFormState } from "@/app/admin/local-materials/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";

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
            await createLocalMaterial({
                name: data.name,
                iconUrl: data.icon_url,
            });
        },
        entityType: "LocalMaterial",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [data.icon_url],
    });
}