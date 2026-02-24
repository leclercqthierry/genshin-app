"use server";

import { charJewelSetSchema } from "@/domain/char-jewel-set/schema";
import { getCharJewelSet, updateCharJewelSet } from "@/services/supabase/char-jewel-set";
import type { CharJewelSetFormState } from "../_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: CharJewelSetFormState,
    formData: FormData
): Promise<CharJewelSetFormState> {
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            elementId: Number(formData.get("elementId")),
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
            rarity5_url: formData.get("rarity5_url")?.toString() ?? "",
        },
        schema: charJewelSetSchema,
        getExisting: getCharJewelSet,
        update: async (id, data) => {
            await updateCharJewelSet(id, {
                name: data.name,
                elementId: data.elementId,
                rarity2Url: data.rarity2_url,
                rarity3Url: data.rarity3_url,
                rarity4Url: data.rarity4_url,
                rarity5Url: data.rarity5_url,
            });
        },
        entityType: "CharJewelSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.rarity2Url, data.rarity2_url],
            [existing.rarity3Url, data.rarity3_url],
            [existing.rarity4Url, data.rarity4_url],
            [existing.rarity5Url, data.rarity5_url],
        ],
    });
}