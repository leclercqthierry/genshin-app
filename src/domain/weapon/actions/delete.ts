"use server";

import { weaponService } from "@/services/supabase/weapon";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteWeaponAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: weaponService.getOne,
        deleteEntity: weaponService.remove,
        entityType: "CharJewelSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.imageUrl,
            e.miniUrl,
        ],
    });
}