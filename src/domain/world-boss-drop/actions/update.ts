"use server";

import { worldBossDropSchema } from "@/domain/world-boss-drop/schema";
import { makeWorldBossDropAdminService } from "@/services/supabase/world-boss-drop";
import type { WorldBossDropFormState } from "@/app/admin/world-boss-drops/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: WorldBossDropFormState,
    formData: FormData
): Promise<WorldBossDropFormState> {

    const worldBossDropAdminService = await makeWorldBossDropAdminService();
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            iconUrl: formData.get("iconUrl")?.toString() ?? "",
        },
        schema: worldBossDropSchema,
        getExisting: worldBossDropAdminService.getOne,
        update: async (id, data) => {
            await worldBossDropAdminService.update(id, {
                name: data.name,
                icon_url: data.iconUrl,
            });
        },
        entityType: "WorldBossDrop",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.iconUrl, data.iconUrl],
        ],
    });
}