"use server";

import { charJewelSetSchema } from "@/domain/char-jewel-set/schema";
import { createCharJewelSet } from "@/services/supabase/char-jewel-set";
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
            await createCharJewelSet({
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
        cleanupFiles: (data) => [
            data.rarity2_url,
            data.rarity3_url,
            data.rarity4_url,
            data.rarity5_url,
        ],
    });
}