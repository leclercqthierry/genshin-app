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
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
            rarity5_url: formData.get("rarity5_url")?.toString() ?? "",
        },
        schema: charJewelSetSchema,
        create: async (data) => {
            await charJewelSetService.create({
                name: data.name,
                element_id: data.elementId,
                rarity2_url: data.rarity2_url,
                rarity3_url: data.rarity3_url,
                rarity4_url: data.rarity4_url,
                rarity5_url: data.rarity5_url,
            });
        },
        entityType: "CharJewelSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity2_url,
            data.rarity3_url,
            data.rarity4_url,
            data.rarity5_url,
        ],
    });
}