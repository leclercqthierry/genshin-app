"use server";

import { extractErrorMessage } from "@/lib/utils/extract-error-message";
import { recordAdminChange } from "@/domain/admin-changes/record-admin-change";
import { deleteUploadThingFile } from "@/services/files/delete-uploadthing-file";
import { logFailedFileDeletion } from "@/lib/utils/supabase/failed-file-deletions";

interface DeleteWithHistoryOptions<TExisting> {
    id: number;
    getExisting: (id: number) => Promise<TExisting | null>;
    deleteEntity: (id: number) => Promise<void>;
    entityType: string;
    entityName: (existing: TExisting) => string;
    deleteFiles?: (existing: TExisting) => string[];
}

export async function deleteWithHistory<TExisting>({
    id,
    getExisting,
    deleteEntity,
    entityType,
    entityName,
    deleteFiles,
}: DeleteWithHistoryOptions<TExisting>) {
    try {
        // 1. Vérification existence
        const existing = await getExisting(id);
        if (!existing) {
            return {
                success: false,
                message: `${entityType} introuvable.`,
            };
        }

        // 2. Suppression en base
        try {
            await deleteEntity(id);
        } catch (err) {
            console.error(`ERREUR SUPPRESSION ${entityType} :`, err);
            return {
                success: false,
                message: extractErrorMessage(err),
            };
        }

        // 3. Historique admin
        try {
            await recordAdminChange({
                entityType,
                action: "delete",
                entityName: entityName(existing),
            });
        } catch (err) {
            console.error("ERREUR HISTORIQUE ADMIN :", err);
        }

        // 4. Suppression UploadThing (optionnel)
        if (deleteFiles) {
            for (const url of deleteFiles(existing)) {
                try {
                    await deleteUploadThingFile(url);
                } catch (err) {
                    console.error("ERREUR SUPPRESSION FICHIER :", err);
                    await logFailedFileDeletion(url, err);
                }
            }
        }

        // 5. Succès
        return { success: true };

    } catch (err) {
        console.error(`ERREUR INATTENDUE DELETE ${entityType} :`, err);
        return {
            success: false,
            message: "Une erreur inattendue est survenue.",
        };
    }
}