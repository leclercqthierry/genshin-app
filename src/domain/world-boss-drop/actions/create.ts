"use server";

import { worldBossDropSchema } from "@/domain/world-boss-drop/schema";
import { worldBossDropService } from "@/services/supabase/world-boss-drop";
import type { WorldBossDropFormState } from "@/app/admin/world-boss-drops/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";

export async function handleCreate(
    _prevState: WorldBossDropFormState,
    formData: FormData
): Promise<WorldBossDropFormState> {
    return createWithHistory({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            iconUrl: formData.get("iconUrl")?.toString() ?? "",
        },
        schema: worldBossDropSchema,
        create: async (data) => {
            await worldBossDropService.create({
                name: data.name,
                icon_url: data.iconUrl,
            });
        },
        entityType: "WorldBossDrop",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [data.iconUrl],
    });
}