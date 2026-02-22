"use server";

import { bossDropSchema } from "@/domain/boss-drop/schema";
import { createBossDrop } from "@/services/supabase/boss-drop";
import { extractErrorMessage } from "@/lib/utils/errors";
import type { BossDropFormState } from "../_components/types";

export async function handleCreate(
    _prevState: BossDropFormState,
    formData: FormData
): Promise<BossDropFormState> {
    try {
        // 1. Extraction
        const raw = {
            name: formData.get("name")?.toString() ?? "",
            icon_url: formData.get("icon_url")?.toString() ?? "",
        };

        // 2. Validation
        const parsed = bossDropSchema.safeParse(raw);
        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        // 3. Création
        try {
            await createBossDrop({
                name: parsed.data.name,
                iconUrl: parsed.data.icon_url,
            });
        } catch (err: unknown) {
            console.error("ERREUR LORS DE LA CRÉATION DU DROP DE BOSS :", err);

            return {
                success: false,
                errors: {},
                message: extractErrorMessage(err),
            };
        }

        return {
            success: true,
            errors: {},
        };
    } catch (err) {
        console.error("ERREUR INATTENDUE HANDLE CREATE BOSS DROP :", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue.",
        };
    }
}