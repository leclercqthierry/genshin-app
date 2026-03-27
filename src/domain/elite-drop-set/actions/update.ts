"use server";

import { EliteDropSetFormState } from "@/app/admin/elite-drop-sets/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";
import { eliteDropSetSchema } from "../schema";
import { eliteDropSetService } from '@/services/supabase/elite-drop-set';

export async function handleUpdate(
    id: number,
    _prev: EliteDropSetFormState,
    formData: FormData
): Promise<EliteDropSetFormState> {
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
        },
        schema: eliteDropSetSchema,
        getExisting: eliteDropSetService.getOne,
        update: async (id, data) => {
            await eliteDropSetService.update(id, {
                name: data.name,
                rarity2_url: data.rarity2_url,
                rarity3_url: data.rarity3_url,
                rarity4_url: data.rarity4_url,
            });
        },
        entityType: "EliteDropSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.rarity2Url, data.rarity2_url],
            [existing.rarity3Url, data.rarity3_url],
            [existing.rarity4Url, data.rarity4_url]
        ],
    });
}