import { deleteUploadThingFile } from "./delete-uploadthing-file";
import { extractErrorMessage } from "@/lib/utils/errors";

export async function replaceUploadThingFile(
    oldUrl: string | null,
    newUrl: string | null
): Promise<void> {
    try {
        // Si pas de nouvelle image → rien à faire
        if (!newUrl) return;

        // Si l’image n’a pas changé → rien à faire
        if (oldUrl === newUrl) return;

        // Supprimer l’ancienne image si elle existe
        if (oldUrl) {
            try {
                await deleteUploadThingFile(oldUrl);
            } catch (err: unknown) {
                console.error("ERREUR SUPPRESSION ANCIEN FICHIER :", err);
                throw new Error(extractErrorMessage(err));
            }
        }

        // Rien d’autre à faire : UploadThing gère déjà l’upload du nouveau fichier
    } catch (err: unknown) {
        console.error("ERREUR INATTENDUE REPLACE UPLOADTHING FILE :", err);
        throw new Error(extractErrorMessage(err));
    }
}