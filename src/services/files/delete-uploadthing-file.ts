import { UTApi } from "uploadthing/server";
import { extractErrorMessage } from "@/lib/utils/extract-error-message";
import { extractFileKey } from "./extract-file-key";

export async function deleteUploadThingFile(
    url: string | null | undefined
): Promise<void> {
    const utapi = new UTApi();
    if (!url) return;

    const fileKey = extractFileKey(url);

    try {
        await utapi.deleteFiles(fileKey);
    } catch (err: unknown) {
        console.error("ERREUR SUPPRESSION UPLOADTHING :", err);

        // Ici on throw, car les actions serveur doivent pouvoir
        // renvoyer un message utilisateur propre.
        throw new Error(extractErrorMessage(err));
    }
}