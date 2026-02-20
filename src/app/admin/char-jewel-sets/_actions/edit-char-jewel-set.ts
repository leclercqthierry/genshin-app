"use server";

import { getCharJewelSet, updateCharJewelSet } from "@/services/supabase/char-jewel-set";
import { replaceUploadThingFile } from "@/services/files/replace-uploadthing-file";
import { extractErrorMessage } from "@/lib/utils/errors";
import type { CharJewelSetFormState } from "../_components/types";
import { charJewelSetSchema } from "@/domain/char-jewel-set/schema";

export async function handleUpdate(
    id: number,
    _prevState: CharJewelSetFormState,
    formData: FormData
): Promise<CharJewelSetFormState> {
    try {
        // 1. Vérification de l'existant
        const existing = await getCharJewelSet(id);
        if (!existing) {
            return {
                success: false,
                errors: { name: ["Set de joyaux introuvable"] },
            };
        }

        // 2. Extraction brute
        const raw = {
            name: formData.get("name")?.toString() ?? "",
            elementId: Number(formData.get("elementId")),
            rarity2_url: formData.get("rarity2_url")?.toString() ?? "",
            rarity3_url: formData.get("rarity3_url")?.toString() ?? "",
            rarity4_url: formData.get("rarity4_url")?.toString() ?? "",
            rarity5_url: formData.get("rarity5_url")?.toString() ?? "",
        };

        // 3. Validation Zod
        const parsed = charJewelSetSchema.safeParse(raw);
        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        // 4. Remplacement conditionnel des images UploadThing
        try {
            await replaceUploadThingFile(existing.rarity2Url, parsed.data.rarity2_url);
            await replaceUploadThingFile(existing.rarity3Url, parsed.data.rarity3_url);
            await replaceUploadThingFile(existing.rarity4Url, parsed.data.rarity4_url);
            await replaceUploadThingFile(existing.rarity5Url, parsed.data.rarity5_url);
        } catch (err: unknown) {
            console.error("ERREUR REMPLACEMENT FICHIERS CHAR JEWEL SET :", err);

            return {
                success: false,
                errors: {},
                message: extractErrorMessage(err),
            };
        }

        // 5. Mise à jour en base
        try {
            await updateCharJewelSet(id, {
                name: parsed.data.name,
                elementId: parsed.data.elementId,
                rarity2Url: parsed.data.rarity2_url,
                rarity3Url: parsed.data.rarity3_url,
                rarity4Url: parsed.data.rarity4_url,
                rarity5Url: parsed.data.rarity5_url,
            });
        } catch (err: unknown) {
            console.error("ERREUR MISE À JOUR CHAR JEWEL SET :", err);

            return {
                success: false,
                errors: {},
                message: extractErrorMessage(err),
            };
        }

        // 6. Succès
        return {
            success: true,
            errors: {},
        };
    } catch (err: unknown) {
        console.error("ERREUR INATTENDUE HANDLE UPDATE CHAR JEWEL SET :", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue.",
        };
    }
}