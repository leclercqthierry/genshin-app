"use server";

import { worldBossDropSchema } from "@/domain/world-boss-drop/schema";
import { createWorldBossDrop } from "@/services/supabase/world-boss-drop";
import type { WorldBossDropFormState } from "@/app/admin/world-boss-drops/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";

export async function handleCreate(
    _prevState: WorldBossDropFormState,
    formData: FormData
): Promise<WorldBossDropFormState> {
    return createWithHistory({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            icon_url: formData.get("icon_url")?.toString() ?? "",
        },
        schema: worldBossDropSchema,
        create: async (data) => {
            await createWorldBossDrop({
                name: data.name,
                iconUrl: data.icon_url,
            });
        },
        entityType: "WorldBossDrop",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [data.icon_url],
    });
}