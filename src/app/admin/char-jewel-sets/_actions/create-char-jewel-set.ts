"use server";

import { charJewelSetSchema } from "@/domain/char-jewel-set/schema";
import { createCharJewelSet } from "@/services/supabase/char-jewel-set";
import { extractErrorMessage } from "@/lib/utils/errors";
import type { CharJewelSetFormState } from "../_components/types";

export async function handleCreate(
    _prevState: CharJewelSetFormState,
    formData: FormData
): Promise<CharJewelSetFormState> {
    try {
        // 1. Extraction
        const raw = {
            name: formData.get("name")?.toString() ?? "",
            elementId: Number(formData.get("elementId")),
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
            rarity5_url: formData.get("rarity5_url")?.toString() ?? "",
        };

        // 2. Validation
        const parsed = charJewelSetSchema.safeParse(raw);
        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        // 3. Création en base
        try {
            await createCharJewelSet({
                name: parsed.data.name,
                elementId: parsed.data.elementId,
                rarity2Url: parsed.data.rarity2_url,
                rarity3Url: parsed.data.rarity3_url,
                rarity4Url: parsed.data.rarity4_url,
                rarity5Url: parsed.data.rarity5_url,
            });
        } catch (err: unknown) {
            console.error("ERREUR CRÉATION CHAR JEWEL SET :", err);

            return {
                success: false,
                errors: {},
                message: extractErrorMessage(err),
            };
        }

        // 4. Succès
        return {
            success: true,
            errors: {},
        };
    } catch (err: unknown) {
        console.error("ERREUR INATTENDUE HANDLE CREATE CHAR JEWEL SET :", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue.",
        };
    }
}