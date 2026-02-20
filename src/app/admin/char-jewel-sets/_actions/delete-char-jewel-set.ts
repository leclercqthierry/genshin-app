"use server";

import { getCharJewelSet, deleteCharJewelSet } from "@/services/supabase/char-jewel-set";
import { deleteUploadThingFile } from "@/services/files/delete-uploadthing-file";
import { extractErrorMessage } from "@/lib/utils/errors";

export async function deleteCharJewelSetAction(
    formData: FormData
): Promise<{ success: boolean; message?: string }> {
    try {
        const id = Number(formData.get("id"));
        if (!id || Number.isNaN(id)) {
            return { success: false, message: "ID invalide." };
        }

        const existing = await getCharJewelSet(id);
        if (!existing) {
            return { success: false, message: "Set de joyaux introuvable." };
        }

        try {
            await deleteUploadThingFile(existing.rarity2Url);
            await deleteUploadThingFile(existing.rarity3Url);
            await deleteUploadThingFile(existing.rarity4Url);
            await deleteUploadThingFile(existing.rarity5Url);
        } catch (err: unknown) {
            console.error("ERREUR SUPPRESSION FICHIERS CHAR JEWEL SET :", err);
            return { success: false, message: extractErrorMessage(err) };
        }

        try {
            await deleteCharJewelSet(id);
        } catch (err: unknown) {
            console.error("ERREUR SUPPRESSION CHAR JEWEL SET EN BASE :", err);
            return { success: false, message: extractErrorMessage(err) };
        }

        return { success: true };
    } catch (err: unknown) {
        console.error("ERREUR INATTENDUE DELETE CHAR JEWEL SET ACTION :", err);
        return { success: false, message: "Une erreur inattendue est survenue." };
    }
}