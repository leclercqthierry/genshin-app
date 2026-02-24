"use server";

import { extractErrorMessage } from "@/lib/utils/errors";
import { recordAdminChange } from "@/domain/admin-changes/actions";
import { deleteUploadThingFile } from "@/services/files/delete-uploadthing-file";
import { logFailedFileDeletion } from "@/lib/utils/supabase/failed-file-deletions";
import type { ZodType } from "zod";

interface CreateWithHistoryOptions<TParsed> {
    raw: unknown;
    schema: ZodType<TParsed>;
    create: (data: TParsed) => Promise<void>;
    entityType: string;
    entityName: (data: TParsed) => string;
    cleanupFiles?: (data: TParsed) => string[];
}

export async function createWithHistory<TParsed>({
    raw,
    schema,
    create,
    entityType,
    entityName,
    cleanupFiles,
}: CreateWithHistoryOptions<TParsed>) {
    // 1. Validation strictement typée
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    const data = parsed.data;

    // 2. Création
    try {
        await create(data);
    } catch (err) {
        console.error(`ERREUR CRÉATION ${entityType} :`, err);

        // Cleanup UploadThing si nécessaire
        if (cleanupFiles) {
            for (const url of cleanupFiles(data)) {
                try {
                    await deleteUploadThingFile(url);
                } catch (fileErr) {
                    console.error("ERREUR CLEANUP FICHIER :", fileErr);
                    await logFailedFileDeletion(url, fileErr);
                }
            }
        }

        return {
            success: false,
            errors: {},
            message: extractErrorMessage(err),
        };
    }

    // 3. Historique admin
    try {
        await recordAdminChange({
            entityType,
            action: "create",
            entityName: entityName(data),
        });
    } catch (err) {
        console.error("Erreur lors de l'enregistrement du changement admin :", err);
    }

    // 4. Succès
    return {
        success: true,
        errors: {},
    };
}