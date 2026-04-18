"use server";

import { MobDropSetFormState } from "@/app/admin/mob-drop-sets/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";
import { mobDropSetSchema } from "../schema";
import { mobDropSetService } from '@/services/supabase/mob-drop-set';

export async function handleUpdate(
    id: number,
    _prev: MobDropSetFormState,
    formData: FormData
): Promise<MobDropSetFormState> {
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity1Url: formData.get("rarity1Url")?.toString() ?? "",
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
        },
        schema: mobDropSetSchema,
        getExisting: mobDropSetService.getOne,
        update: async (id, data) => {
            await mobDropSetService.update(id, {
                name: data.name,
                rarity1_url: data.rarity1Url,
                rarity2_url: data.rarity2Url,
                rarity3_url: data.rarity3Url,
            });
        },
        entityType: "MobDropSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.rarity1Url, data.rarity1Url],
            [existing.rarity2Url, data.rarity2Url],
            [existing.rarity3Url, data.rarity3Url]
        ],
    });
}