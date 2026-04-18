"use server";

import { charJewelSetSchema } from "@/domain/char-jewel-set/schema";
import { charJewelSetService } from "@/services/supabase/char-jewel-set";
import type { CharJewelSetFormState } from "@/app/admin/char-jewel-sets/_components/types";
import {
    createWithHistory

} from "@/domain/admin-changes/create-with-history";
export async function handleCreate(
    _prevState: CharJewelSetFormState,
    formData: FormData
): Promise<CharJewelSetFormState> {
    return createWithHistory({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            elementId: Number(formData.get("elementId")),
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
            rarity4Url: formData.get("rarity4Url")?.toString() ?? "",
            rarity5Url: formData.get("rarity5Url")?.toString() ?? "",
        },
        schema: charJewelSetSchema,
        create: async (data) => {
            await charJewelSetService.create({
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
        cleanupFiles: (data) => [
            data.rarity2Url,
            data.rarity3Url,
            data.rarity4Url,
            data.rarity5Url,
        ],
    });
}