"use server";

import { aptitudeSetSchema } from "@/domain/aptitude-set/schema";
import { makeAptitudeSetAdminService } from "@/services/supabase/aptitude-set";
import type { AptitudeSetFormState } from "@/app/admin/aptitude-sets/_components/types";
import { createWithHistory } from "@/domain/admin-changes/create-with-history";
import { z } from "zod";

export async function handleCreate(
    _prevState: AptitudeSetFormState,
    formData: FormData
): Promise<AptitudeSetFormState> {
    const aptitudeSetAdminService = await makeAptitudeSetAdminService();
    return createWithHistory<z.infer<typeof aptitudeSetSchema>>({
        raw: {
            name: formData.get("name")?.toString() ?? "",
            rarity2Url: formData.get("rarity2Url")?.toString() ?? "",
            rarity3Url: formData.get("rarity3Url")?.toString() ?? "",
            rarity4Url: formData.get("rarity4Url")?.toString() ?? "",
        },
        schema: aptitudeSetSchema,
        create: async (data) => {
            await aptitudeSetAdminService.create({
                name: data.name,
                rarity2_url: data.rarity2Url,
                rarity3_url: data.rarity3Url,
                rarity4_url: data.rarity4Url,
            });
        },
        entityType: "AptitudeSet",
        entityName: (data) => data.name,
        cleanupFiles: (data) => [
            data.rarity2Url,
            data.rarity3Url,
            data.rarity4Url,
        ],
    });
}