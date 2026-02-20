"use server";

import { deleteElement, getElement } from "@/services/supabase/element";
import { deleteUploadThingFile } from "@/services/files/delete-uploadthing-file";
import { extractErrorMessage } from "@/lib/utils/errors";

export async function deleteElementAction(
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
        const element = await getElement(id);
        if (!element) {
            return {
                success: false,
                message: "Élément introuvable.",
            };
        }

        // 3. Suppression du fichier UploadThing
        try {
            await deleteUploadThingFile(element.iconUrl);
        } catch (err: unknown) {
            console.error("ERREUR SUPPRESSION FICHIER :", err);

            return {
                success: false,
                message: extractErrorMessage(err),
            };
        }

        // 4. Suppression en base
        try {
            await deleteElement(id);
        } catch (err: unknown) {
            console.error("ERREUR SUPPRESSION ÉLÉMENT :", err);

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
        console.error("ERREUR INATTENDUE DELETE ELEMENT ACTION :", err);

        return {
            success: false,
            message: "Une erreur inattendue est survenue.",
        };
    }
}