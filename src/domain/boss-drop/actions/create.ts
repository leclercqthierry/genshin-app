"use server";

import { bossDropSchema } from "@/domain/boss-drop/schema";
import { makeBossDropAdminService } from "@/services/supabase/boss-drop";
import type { BossDropFormState } from "@/app/admin/boss-drops/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";

export async function handleCreate(
    _prevState: BossDropFormState,
    formData: FormData
): Promise<BossDropFormState> {
    return createWithHistory({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            iconUrl: formData.get("iconUrl")?.toString() ?? "",
        },
        schema: bossDropSchema,
        create: async (data) => {
            const bossDropAdminService = await makeBossDropAdminService();
            await bossDropAdminService.create({
                name: data.name,
                icon_url: data.iconUrl,
            });
        },
        entityType: "BossDrop",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [data.iconUrl],
    });
}