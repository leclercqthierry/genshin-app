"use server";

import { elementSchema } from "@/domain/element/schema";
import { getElement, updateElement } from "@/services/supabase/element";
import { replaceUploadThingFile } from "@/services/files/replace-uploadthing-file";
import { extractErrorMessage } from "@/lib/utils/errors";
import type { ElementFormState } from "../_components/types";

export async function handleUpdate(
    id: number,
    _prev: ElementFormState,
    formData: FormData
): Promise<ElementFormState> {
    try {
        // 1. Vérification de l'existence
        const existing = await getElement(id);
        if (!existing) {
            return {
                success: false,
                errors: { name: ["Élément introuvable"] },
            };
        }

        // 2. Extraction
        const raw = {
            name: formData.get("name")?.toString() ?? "",
            icon_url: formData.get("icon_url")?.toString() ?? "",
        };

        // 3. Validation
        const parsed = elementSchema.safeParse(raw);
        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        // 4. Remplacement éventuel du fichier UploadThing
        try {
            await replaceUploadThingFile(existing.iconUrl, parsed.data.icon_url);
        } catch (err: unknown) {
            console.error("ERREUR REMPLACEMENT FICHIER :", err);

            return {
                success: false,
                errors: {},
                message: extractErrorMessage(err),
            };
        }

        // 5. Mapping vers le payload Supabase
        const payload = {
            name: parsed.data.name,
            iconUrl: parsed.data.icon_url,
        };

        // 6. Mise à jour en base
        try {
            await updateElement(id, payload);
        } catch (err: unknown) {
            console.error("ERREUR MISE À JOUR ÉLÉMENT :", err);

            return {
                success: false,
                errors: {},
                message: extractErrorMessage(err),
            };
        }

        // 7. Succès
        return {
            success: true,
            errors: {},
        };
    } catch (err: unknown) {
        console.error("ERREUR INATTENDUE HANDLE UPDATE ELEMENT :", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue.",
        };
    }
}