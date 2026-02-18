// src/services/files/delete-uploadthing-file.ts
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

function extractFileKey(url: string) {
    const parts = url.split("/");
    return parts[parts.length - 1];
}

export async function deleteUploadThingFile(url: string | null | undefined) {
    if (!url) return;

    const fileKey = extractFileKey(url);

    try {
        await utapi.deleteFiles(fileKey);
    } catch (err) {
        console.error("Erreur suppression UploadThing:", err);
        // Tu peux choisir de throw si tu veux rendre la suppression stricte
    }
}