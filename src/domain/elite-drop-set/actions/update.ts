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
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
            rarity4Url: formData.get("rarity4Url")?.toString() ?? "",
        },
        schema: eliteDropSetSchema,
        getExisting: eliteDropSetService.getOne,
        update: async (id, data) => {
            await eliteDropSetService.update(id, {
                name: data.name,
                rarity2_url: data.rarity2Url,
                rarity3_url: data.rarity3Url,
                rarity4_url: data.rarity4Url,
            });
        },
        entityType: "EliteDropSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.rarity2Url, data.rarity2Url],
            [existing.rarity3Url, data.rarity3Url],
            [existing.rarity4Url, data.rarity4Url]
        ],
    });
}