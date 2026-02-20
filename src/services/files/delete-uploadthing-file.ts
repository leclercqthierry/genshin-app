import { UTApi } from "uploadthing/server";
import { extractErrorMessage } from "@/lib/utils/errors";

const utapi = new UTApi();

function extractFileKey(url: string): string {
    const parts = url.split("/");
    return parts[parts.length - 1];
}

export async function deleteUploadThingFile(
    url: string | null | undefined
): Promise<void> {
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