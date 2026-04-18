"use server";

import { bossDropSchema } from "@/domain/boss-drop/schema";
import { bossDropService } from "@/services/supabase/boss-drop";
import type { BossDropFormState } from "@/app/admin/boss-drops/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: BossDropFormState,
    formData: FormData
): Promise<BossDropFormState> {
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            iconUrl: formData.get("iconUrl")?.toString() ?? "",
        },
        schema: bossDropSchema,
        getExisting: bossDropService.getOne,
        update: async (id, data) => {
            await bossDropService.update(id, {
                name: data.name,
                icon_url: data.iconUrl,
            });
        },
        entityType: "BossDrop",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.iconUrl, data.iconUrl],
        ],
    });
}