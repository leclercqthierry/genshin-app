"use server";

import { dungeonDropSetSchema } from "@/domain/dungeon-drop-set/schema";
import { dungeonDropSetService } from "@/services/supabase/dungeon-drop-set";
import type { DungeonDropSetFormState } from "@/app/admin/dungeon-drop-sets/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";
import { z } from "zod";

export async function handleCreate(
    _prevState: DungeonDropSetFormState,
    formData: FormData
): Promise<DungeonDropSetFormState> {
    return createWithHistory<z.infer<typeof dungeonDropSetSchema>>({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
        },
        schema: dungeonDropSetSchema,
        create: async (data) => {
            await dungeonDropSetService.create({
                name: data.name,
                rarity2_url: data.rarity2_url,
                rarity3_url: data.rarity3_url,
                rarity4_url: data.rarity4_url,
            });
        },
        entityType: "DungeonDropSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity2_url,
            data.rarity3_url,
            data.rarity4_url,
        ],
    });
}