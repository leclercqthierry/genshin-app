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
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
        },
        schema: aptitudeDungeonDropSetSchema,
        create: async (data) => {
            await aptitudeDungeonDropSetService.create({
                name: data.name,
                rarity2_url: data.rarity2_url,
                rarity3_url: data.rarity3_url,
                rarity4_url: data.rarity4_url,
            });
        },
        entityType: "AptitudeDungeonDropSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity2_url,
            data.rarity3_url,
            data.rarity4_url,
        ],
    });
}