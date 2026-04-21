"use server";

import { artifactSetSchema } from "@/domain/artifact-set/schema";
import { makeArtifactSetAdminService } from "@/services/supabase/artifact-set";
import type { ArtifactSetFormState } from "@/app/admin/artifact-sets/_components/types";
import { updateWithHistory } from "@/domain/admin-changes/update-with-history";

export async function handleUpdate(
    id: number,
    _prev: ArtifactSetFormState,
    formData: FormData
): Promise<ArtifactSetFormState> {

    const artifactSetAdminService = await makeArtifactSetAdminService();
    return updateWithHistory({
        id,
        raw: {
            name: formData.get("name")?.toString() ?? "",
            iconFlowerUrl: formData.get("iconFlowerUrl")?.toString() ?? "",
            iconPlumeUrl: formData.get("iconPlumeUrl")?.toString() ?? "",
            iconCircletUrl: formData.get("iconCircletUrl")?.toString() ?? "",
            iconSandUrl: formData.get("iconSandUrl")?.toString() ?? "",
            iconGobletUrl: formData.get("iconGobletUrl")?.toString() ?? "",
            bonus2P: formData.get("bonus2P")?.toString() ?? "",
            bonus4P: formData.get("bonus4P")?.toString() ?? "",
            rarityMax: Number(formData.get("rarityMax")),
        },
        schema: artifactSetSchema,
        getExisting: artifactSetAdminService.getOne,
        update: async (id, data) => {
            await artifactSetAdminService.update(id, {
                name: data.name,
                icon_flower_url: data.iconFlowerUrl,
                icon_plume_url: data.iconPlumeUrl,
                icon_circlet_url: data.iconCircletUrl,
                icon_sand_url: data.iconSandUrl,
                icon_goblet_url: data.iconGobletUrl,
                rarity_max: data.rarityMax,
                bonus_2P: data.bonus2P,
                bonus_4P: data.bonus4P,
            });
        },
        entityType: "ArtifactSet",
        entityName: (data) => data.name,
        replaceFiles: (existing, data) => [
            [existing.iconFlowerUrl, data.iconFlowerUrl],
            [existing.iconPlumeUrl, data.iconPlumeUrl],
            [existing.iconCircletUrl, data.iconCircletUrl],
            [existing.iconSandUrl, data.iconSandUrl],
            [existing.iconGobletUrl, data.iconGobletUrl],
        ],
    });
}