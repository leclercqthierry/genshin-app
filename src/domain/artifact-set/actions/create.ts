"use server";

import { artifactSetSchema } from "@/domain/artifact-set/schema";
import { makeArtifactSetAdminService } from "@/services/supabase/artifact-set";
import type { ArtifactSetFormState } from "@/app/admin/artifact-sets/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";

export async function handleCreate(
    _prevState: ArtifactSetFormState,
    formData: FormData
): Promise<ArtifactSetFormState> {

    return createWithHistory({
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
        create: async (data) => {
            const artifactSetAdminService = await makeArtifactSetAdminService();
            await artifactSetAdminService.create({
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
        cleanupFiles: (data) => [
            data.iconFlowerUrl,
            data.iconPlumeUrl,
            data.iconCircletUrl,
            data.iconSandUrl,
            data.iconGobletUrl,
        ],
    });
}