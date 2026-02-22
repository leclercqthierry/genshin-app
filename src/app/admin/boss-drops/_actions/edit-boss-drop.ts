"use server";

import { bossDropSchema } from "@/domain/boss-drop/schema";
import { getBossDrop, updateBossDrop } from "@/services/supabase/boss-drop";
import { replaceUploadThingFile } from "@/services/files/replace-uploadthing-file";
import { extractErrorMessage } from "@/lib/utils/errors";
import type { BossDropFormState } from "../_components/types";

export async function handleUpdate(
    id: number,
    _prev: BossDropFormState,
    formData: FormData
): Promise<BossDropFormState> {
    try {
        // 1. Vérification de l'existence
        const existing = await getBossDrop(id);
        if (!existing) {
            return {
                success: false,
                errors: { name: ["Drop de boss introuvable"] },
            };
        }

        // 2. Extraction
        const raw = {
            name: formData.get("name")?.toString() ?? "",
            icon_url: formData.get("icon_url")?.toString() ?? "",
        };

        // 3. Validation
        const parsed = bossDropSchema.safeParse(raw);
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
            await updateBossDrop(id, payload);
        } catch (err: unknown) {
            console.error("ERREUR MISE À JOUR DU DROP DE BOSS :", err);

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
        console.error("ERREUR INATTENDUE HANDLE UPDATE BOSS DROP :", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue.",
        };
    }
}