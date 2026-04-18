"use server";

import { mobDropSetSchema } from "@/domain/mob-drop-set/schema";
import { mobDropSetService } from "@/services/supabase/mob-drop-set";
import type { MobDropSetFormState } from "@/app/admin/mob-drop-sets/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";
import { z } from "zod";

export async function handleCreate(
    _prevState: MobDropSetFormState,
    formData: FormData
): Promise<MobDropSetFormState> {
    return createWithHistory<z.infer<typeof mobDropSetSchema>>({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity1Url: formData.get("rarity1Url")?.toString() ?? "",
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
        },
        schema: mobDropSetSchema,
        create: async (data) => {
            await mobDropSetService.create({
                name: data.name,
                rarity1_url: data.rarity1Url,
                rarity2_url: data.rarity2Url,
                rarity3_url: data.rarity3Url,
            });
        },
        entityType: "MobDropSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity1Url,
            data.rarity2Url,
            data.rarity3Url,
        ],
    });
}