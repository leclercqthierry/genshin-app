"use server";

import { aptitudeDungeonDropSetSchema } from "@/domain/aptitude-dungeon-drop-set/schema";
import { aptitudeDungeonDropSetService } from "@/services/supabase/aptitude-dungeon-drop-set";
import type { AptitudeDungeonDropSetFormState } from "@/app/admin/aptitude-dungeon-drop-sets/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";
import { z } from "zod";

export async function handleCreate(
    _prevState: AptitudeDungeonDropSetFormState,
    formData: FormData
): Promise<AptitudeDungeonDropSetFormState> {
    return createWithHistory<z.infer<typeof aptitudeDungeonDropSetSchema>>({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
            rarity4Url: formData.get("rarity4Url")?.toString() ?? "",
        },
        schema: aptitudeDungeonDropSetSchema,
        create: async (data) => {
            await aptitudeDungeonDropSetService.create({
                name: data.name,
                rarity2_url: data.rarity2Url,
                rarity3_url: data.rarity3Url,
                rarity4_url: data.rarity4Url,
            });
        },
        entityType: "AptitudeDungeonDropSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity2Url,
            data.rarity3Url,
            data.rarity4Url,
        ],
    });
}