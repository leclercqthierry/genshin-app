"use server";

import { worldBossDropSchema } from "@/domain/world-boss-drop/schema";
import { getWorldBossDrop, updateWorldBossDrop } from "@/services/supabase/world-boss-drop";
import type { WorldBossDropFormState } from "@/app/admin/world-boss-drops/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: WorldBossDropFormState,
    formData: FormData
): Promise<WorldBossDropFormState> {
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            icon_url: formData.get("icon_url")?.toString() ?? "",
        },
        schema: worldBossDropSchema,
        getExisting: getWorldBossDrop,
        update: async (id, data) => {
            await updateWorldBossDrop(id, {
                name: data.name,
                iconUrl: data.icon_url,
            });
        },
        entityType: "WorldBossDrop",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.iconUrl, data.icon_url],
        ],
    });
}