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
            rarity1_url: formData.get("rarity1_url")?.toString() ?? "",
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
        },
        schema: mobDropSetSchema,
        create: async (data) => {
            await mobDropSetService().create({
                name: data.name,
                rarity1_url: data.rarity1_url,
                rarity2_url: data.rarity2_url,
                rarity3_url: data.rarity3_url,
            });
        },
        entityType: "MobDropSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity1_url,
            data.rarity2_url,
            data.rarity3_url,
        ],
    });
}