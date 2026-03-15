"use server";

import { charJewelSetService } from "@/services/supabase/char-jewel-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteCharJewelSetAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: charJewelSetService.getOne,
        deleteEntity: charJewelSetService.remove,
        entityType: "CharJewelSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.rarity2Url,
            e.rarity3Url,
            e.rarity4Url,
            e.rarity5Url,
        ],
    });
}