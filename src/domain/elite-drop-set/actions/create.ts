"use server";

import { eliteDropSetSchema } from "@/domain/elite-drop-set/schema";
import { makeEliteDropSetAdminService } from "@/services/supabase/elite-drop-set";
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
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
            rarity4Url: formData.get("rarity4Url")?.toString() ?? "",
        },
        schema: eliteDropSetSchema,
        create: async (data) => {
            const eliteDropSetAdminService = await makeEliteDropSetAdminService();
            await eliteDropSetAdminService.create({
                name: data.name,
                rarity2_url: data.rarity2Url,
                rarity3_url: data.rarity3Url,
                rarity4_url: data.rarity4Url,
            });
        },
        entityType: "EliteDropSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity2Url,
            data.rarity3Url,
            data.rarity4Url,
        ],
    });
}