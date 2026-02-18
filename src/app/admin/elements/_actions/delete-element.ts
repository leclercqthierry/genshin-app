"use server";

import { deleteElement, getElement } from "@/services/supabase/element";
import { deleteUploadThingFile } from "@/services/files/delete-uploadthing-file";

export async function deleteElementAction(formData: FormData) {
    const id = Number(formData.get("id"));
    if (!id) return;

    const element = await getElement(id);
    if (!element) return;

    // 1) supprimer l’icône UploadThing
    await deleteUploadThingFile(element.iconUrl);

    // 2) supprimer en base
    await deleteElement(id);
}