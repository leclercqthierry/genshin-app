"use server";

import { makeArtifactSetAdminService } from "@/services/supabase/artifact-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteArtifactSetAction(formData: FormData) {
    const id = Number(formData.get("id"));
    const artifactSetAdminService = await makeArtifactSetAdminService();

    return deleteWithHistory({
        id,
        getExisting: artifactSetAdminService.getOne,
        deleteEntity: artifactSetAdminService.remove,
        entityType: "ArtifactSet",
        entityName: (e) => e.name,
        deleteFiles: (e) => [
            e.iconFlowerUrl,
            e.iconPlumeUrl,
            e.iconCircletUrl,
            e.iconSandUrl,
            e.iconGobletUrl,
        ],
    });
}