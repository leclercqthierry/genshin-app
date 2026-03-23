"use server";

import { artifactSetSchema } from "@/domain/artifact-set/schema";
import { artifactSetService } from "@/services/supabase/artifact-set";
import type { ArtifactSetFormState } from "@/app/admin/artifact-sets/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";

export async function handleCreate(
    _prevState: ArtifactSetFormState,
    formData: FormData
): Promise<ArtifactSetFormState> {

    return createWithHistory({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            icon_flower_url: formData.get("icon_flower_url")?.toString() ?? "",
            icon_plume_url: formData.get("icon_plume_url")?.toString() ?? "",
            icon_circlet_url: formData.get("icon_circlet_url")?.toString() ?? "",
            icon_sand_url: formData.get("icon_sand_url")?.toString() ?? "",
            icon_goblet_url: formData.get("icon_goblet_url")?.toString() ?? "",
            bonus_2P: formData.get("bonus_2P")?.toString() ?? "",
            bonus_4P: formData.get("bonus_4P")?.toString() ?? "",
            rarity_max: Number(formData.get("rarity_max"))
        },
        schema: artifactSetSchema,
        create: async (data) => {
            await artifactSetService().create({
                name: data.name,
                icon_flower_url: data.icon_flower_url,
                icon_plume_url: data.icon_plume_url,
                icon_circlet_url: data.icon_circlet_url,
                icon_sand_url: data.icon_sand_url,
                icon_goblet_url: data.icon_goblet_url,
                rarity_max: data.rarity_max,
                bonus_2P: data.bonus_2P,
                bonus_4P: data.bonus_4P,
            });
        },
        entityType: "ArtifactSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.icon_flower_url,
            data.icon_plume_url,
            data.icon_circlet_url,
            data.icon_sand_url,
            data.icon_goblet_url,
        ],
    });
}