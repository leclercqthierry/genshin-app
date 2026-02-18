"use server";

import { elementSchema } from "@/domain/element/schema";
import { createElement } from "@/services/supabase/element";
import type { ElementFormState } from "../_components/types";

export async function handleCreate(
    _prevState: ElementFormState,
    formData: FormData
): Promise<ElementFormState> {
    try {
        const raw = {
            name: formData.get("name")?.toString() ?? "",
            icon_url: formData.get("icon_url")?.toString() ?? "",
        };

        const parsed = elementSchema.safeParse(raw);

        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        // ⭐ Transformation ici
        await createElement({
            name: parsed.data.name,
            iconUrl: parsed.data.icon_url,
        });

        return {
            success: true,
            errors: {},
        };
    } catch (err) {
        console.error("CREATE ELEMENT ERROR", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue",
        };
    }
}