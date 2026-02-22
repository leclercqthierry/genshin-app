"use server";

import { deleteBossDrop, getBossDrop } from "@/services/supabase/boss-drop";
import { deleteUploadThingFile } from "@/services/files/delete-uploadthing-file";
import { extractErrorMessage } from "@/lib/utils/errors";

export async function deleteBossDropAction(
    formData: FormData
): Promise<{ success: boolean; message?: string }> {
    try {
        // 1. Extraction de l'id
        const id = Number(formData.get("id"));
        if (!id) {
            return {
                success: false,
                message: "Identifiant invalide.",
            };
        }

        // 2. Vérification existence
        const bossDrop = await getBossDrop(id);
        if (!bossDrop) {
            return {
                success: false,
                message: "Drop de boss introuvable.",
            };
        }

        // 3. Suppression du fichier UploadThing
        try {
            await deleteUploadThingFile(bossDrop.iconUrl);
        } catch (err: unknown) {
            console.error("ERREUR SUPPRESSION FICHIER :", err);

            return {
                success: false,
                message: extractErrorMessage(err),
            };
        }

        // 4. Suppression en base
        try {
            await deleteBossDrop(id);
        } catch (err: unknown) {
            console.error("ERREUR SUPPRESSION BOSS DROP :", err);

            return {
                success: false,
                message: extractErrorMessage(err),
            };
        }

        // 5. Succès
        return {
            success: true,
        };
    } catch (err: unknown) {
        console.error("ERREUR INATTENDUE DELETE BOSS DROP ACTION :", err);

        return {
            success: false,
            message: "Une erreur inattendue est survenue.",
        };
    }
}