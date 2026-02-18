"use server";

import { elementSchema } from "@/domain/element/schema";
import { getElement, updateElement } from "@/services/supabase/element";
import { replaceUploadThingFile } from "@/services/files/replace-uploadthing-file";
import type { ElementFormState } from "../_components/types";

export async function handleUpdate(
    id: number,
    _prev: ElementFormState,
    formData: FormData
): Promise<ElementFormState> {
    const existing = await getElement(id);
    if (!existing) {
        return {
            success: false,
            errors: { name: ["Élément introuvable"] },
        };
    }

    const raw = {
        name: formData.get("name"),
        icon_url: formData.get("icon_url"),
    };

    const parsed = elementSchema.safeParse(raw);

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    // 1) Remplacement éventuel de l’image
    await replaceUploadThingFile(existing.iconUrl, parsed.data.icon_url);

    // 2) Mapping Zod → domaine Supabase
    const payload = {
        name: parsed.data.name,
        iconUrl: parsed.data.icon_url, // ← la clé correcte
    };

    // 3) Mise à jour en base
    await updateElement(id, payload);

    return { success: true, errors: {} };
}