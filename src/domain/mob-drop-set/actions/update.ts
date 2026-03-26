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
            rarity1_url: formData.get("rarity1_url")?.toString() ?? "",
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
        },
        schema: mobDropSetSchema,
        getExisting: mobDropSetService().getOne,
        update: async (id, data) => {
            await mobDropSetService().update(id, {
                name: data.name,
                rarity1_url: data.rarity1_url,
                rarity2_url: data.rarity2_url,
                rarity3_url: data.rarity3_url,
            });
        },
        entityType: "MobDropSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.rarity1Url, data.rarity1_url],
            [existing.rarity2Url, data.rarity2_url],
            [existing.rarity3Url, data.rarity3_url]
        ],
    });
}