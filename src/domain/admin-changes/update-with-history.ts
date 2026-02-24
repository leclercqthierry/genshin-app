"use server";

import type { ZodType } from "zod";
import { extractErrorMessage } from "@/lib/utils/errors";
import { recordAdminChange } from "@/domain/admin-changes/actions";
import { replaceUploadThingFile } from "@/services/files/replace-uploadthing-file";

interface UpdateWithHistoryOptions<TParsed, TExisting> {
    id: number;
    raw: unknown;
    schema: ZodType<TParsed>;
    getExisting: (id: number) => Promise<TExisting | null>;
    update: (id: number, data: TParsed) => Promise<void>;
    entityType: string;
    entityName: (data: TParsed) => string;
    replaceFiles?: (existing: TExisting, data: TParsed) => Array<[string, string]>;
}

export async function updateWithHistory<TParsed, TExisting>({
    id,
    raw,
    schema,
    getExisting,
    update,
    entityType,
    entityName,
    replaceFiles,
}: UpdateWithHistoryOptions<TParsed, TExisting>) {
    try {
        // 1. Vérification de l'existant
        const existing = await getExisting(id);
        if (!existing) {
            return {
                success: false,
                errors: { name: [`${entityType} introuvable`] },
            };
        }

        // 2. Validation
        const parsed = schema.safeParse(raw);
        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;

            // Normalisation : remplacer undefined par []
            const normalizedErrors: Record<string, string[]> = {};
            for (const key in fieldErrors) {
                normalizedErrors[key] = fieldErrors[key] ?? [];
            }

            return {
                success: false,
                errors: normalizedErrors,
            };
        }

        const data = parsed.data;

        // 3. Remplacement UploadThing (optionnel)
        if (replaceFiles) {
            try {
                for (const [oldUrl, newUrl] of replaceFiles(existing, data)) {
                    await replaceUploadThingFile(oldUrl, newUrl);
                }
            } catch (err) {
                console.error("ERREUR REMPLACEMENT FICHIER :", err);
                return {
                    success: false,
                    errors: {},
                    message: extractErrorMessage(err),
                };
            }
        }

        // 4. Mise à jour en base
        try {
            await update(id, data);
        } catch (err) {
            console.error(`ERREUR MISE À JOUR ${entityType} :`, err);
            return {
                success: false,
                errors: {},
                message: extractErrorMessage(err),
            };
        }

        // 5. Historique admin
        try {
            await recordAdminChange({
                entityType,
                action: "update",
                entityName: entityName(data),
            });
        } catch (err) {
            console.error("ERREUR HISTORIQUE ADMIN :", err);
        }

        // 6. Succès
        return {
            success: true,
            errors: {},
        };

    } catch (err) {
        console.error(`ERREUR INATTENDUE UPDATE ${entityType} :`, err);
        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue.",
        };
    }
}