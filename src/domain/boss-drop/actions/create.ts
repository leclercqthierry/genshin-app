"use server";

import { bossDropSchema } from "@/domain/boss-drop/schema";
import { bossDropService } from "@/services/supabase/boss-drop";
import type { BossDropFormState } from "@/app/admin/boss-drops/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";

export async function handleCreate(
    _prevState: BossDropFormState,
    formData: FormData
): Promise<BossDropFormState> {
    return createWithHistory({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            icon_url: formData.get("icon_url")?.toString() ?? "",
        },
        schema: bossDropSchema,
        create: async (data) => {
            await bossDropService.create({
                name: data.name,
                icon_url: data.icon_url,
            });
        },
        entityType: "BossDrop",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [data.icon_url],
    });
}