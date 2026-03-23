"use server";

import { artifactSetService } from "@/services/supabase/artifact-set";
import { deleteWithHistory } from "@/domain/admin-changes/delete-with-history";

export async function deleteArtifactSetAction(formData: FormData) {
    const id = Number(formData.get("id"));

    return deleteWithHistory({
        id,
        getExisting: artifactSetService().getOne,
        deleteEntity: artifactSetService().remove,
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