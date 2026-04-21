"use server";

import { charJewelSetSchema } from "@/domain/char-jewel-set/schema";
import { makeCharJewelSetAdminService } from "@/services/supabase/char-jewel-set";
import type { CharJewelSetFormState } from "@/app/admin/char-jewel-sets/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: CharJewelSetFormState,
    formData: FormData
): Promise<CharJewelSetFormState> {

    const charJewelSetAdminService = await makeCharJewelSetAdminService();
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            elementId: Number(formData.get("elementId")),
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
            rarity4Url: formData.get("rarity4Url")?.toString() ?? "",
            rarity5Url: formData.get("rarity5Url")?.toString() ?? "",
        },
        schema: charJewelSetSchema,
        getExisting: charJewelSetAdminService.getOne,
        update: async (id, data) => {
            await charJewelSetAdminService.update(id, {
                name: data.name,
                element_id: data.elementId,
                rarity2_url: data.rarity2Url,
                rarity3_url: data.rarity3Url,
                rarity4_url: data.rarity4Url,
                rarity5_url: data.rarity5Url,
            });
        },
        entityType: "CharJewelSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.rarity2Url, data.rarity2Url],
            [existing.rarity3Url, data.rarity3Url],
            [existing.rarity4Url, data.rarity4Url],
            [existing.rarity5Url, data.rarity5Url],
        ],
    });
}