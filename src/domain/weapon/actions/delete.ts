"use server";

import { makeWeaponAdminService } from "@/services/supabase/weapon";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteWeaponAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const weaponAdminService = await makeWeaponAdminService();
    return deleteWithHistory({
        id,
        getExisting: weaponAdminService.getOne,
        deleteEntity: weaponAdminService.remove,
        entityType: "CharJewelSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.imageUrl,
            e.miniUrl,
        ],
    });
}