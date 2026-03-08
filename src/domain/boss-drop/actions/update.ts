"use server";

import { bossDropSchema } from "@/domain/boss-drop/schema";
import { getBossDrop, updateBossDrop } from "@/services/supabase/boss-drop";
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
            icon_url: formData.get("icon_url")?.toString() ?? "",
        },
        schema: bossDropSchema,
        getExisting: getBossDrop,
        update: async (id, data) => {
            await updateBossDrop(id, {
                name: data.name,
                iconUrl: data.icon_url,
            });
        },
        entityType: "BossDrop",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.iconUrl, data.icon_url],
        ],
    });
}