"use server";

import { eliteDropSetSchema } from "@/domain/elite-drop-set/schema";
import { eliteDropSetService } from "@/services/supabase/elite-drop-set";
import type { EliteDropSetFormState } from "@/app/admin/elite-drop-sets/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";
import { z } from "zod";

export async function handleCreate(
    _prevState: EliteDropSetFormState,
    formData: FormData
): Promise<EliteDropSetFormState> {
    return createWithHistory<z.infer<typeof eliteDropSetSchema>>({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
        },
        schema: eliteDropSetSchema,
        create: async (data) => {
            await eliteDropSetService.create({
                name: data.name,
                rarity2_url: data.rarity2_url,
                rarity3_url: data.rarity3_url,
                rarity4_url: data.rarity4_url,
            });
        },
        entityType: "EliteDropSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity2_url,
            data.rarity3_url,
            data.rarity4_url,
        ],
    });
}