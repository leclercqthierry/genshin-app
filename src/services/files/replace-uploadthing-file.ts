import { deleteUploadThingFile } from "./delete-uploadthing-file";

export async function replaceUploadThingFile(oldUrl: string | null, newUrl: string | null) {
    // Si pas de nouvelle image → rien à faire
    if (!newUrl) return;

    // Si l’image n’a pas changé → rien à faire
    if (oldUrl === newUrl) return;

    // Supprimer l’ancienne image si elle existe
    if (oldUrl) {
        await deleteUploadThingFile(oldUrl);
    }

    // Rien d’autre à faire : UploadThing gère déjà l’upload du nouveau fichier
}