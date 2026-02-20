"use server";

import { elementSchema } from "@/domain/element/schema";
import { createElement } from "@/services/supabase/element";
import { extractErrorMessage } from "@/lib/utils/errors";
import type { ElementFormState } from "../_components/types";

export async function handleCreate(
    _prevState: ElementFormState,
    formData: FormData
): Promise<ElementFormState> {
    try {
        // 1. Extraction
        const raw = {
            name: formData.get("name")?.toString() ?? "",
            icon_url: formData.get("icon_url")?.toString() ?? "",
        };

        // 2. Validation
        const parsed = elementSchema.safeParse(raw);
        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        // 3. Création
        try {
            await createElement({
                name: parsed.data.name,
                iconUrl: parsed.data.icon_url,
            });
        } catch (err: unknown) {
            console.error("ERREUR LORS DE LA CRÉATION D'ÉLÉMENT :", err);

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
        console.error("ERREUR INATTENDUE HANDLE CREATE ELEMENT :", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue.",
        };
    }
}