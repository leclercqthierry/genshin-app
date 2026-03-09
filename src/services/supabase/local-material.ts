import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import type { LocalMaterial } from "@/domain/local-material/types";
import { mapRowToLocalMaterial } from "@/domain/local-material/mapper";


/* ---------------------------------------------
 * LECTURE (READ-ONLY)
 * --------------------------------------------- */

/**
 * Récupère tous les ressources locales (lecture seule).
 */
export async function getLocalMaterials(): Promise<LocalMaterial[]> {
    try {
        const supabase = await createSupabaseClientReadOnly();

        const { data, error } = await supabase
            .from("local_materials")
            .select("*")
            .order("name", { ascending: true });

        if (error) {
            console.error("ERREUR LECTURE LOCAL MATERIALS :", error);
            return [];
        }

        return (data ?? []).map(mapRowToLocalMaterial);
    } catch (err) {
        console.error("ERREUR INATTENDUE GET LOCAL MATERIALS :", err);
        return [];
    }
}

/**
 * Récupère une ressource locale spécifique (lecture seule).
 */
export async function getLocalMaterial(id: number): Promise<LocalMaterial | null> {
    try {
        const supabase = await createSupabaseClientReadOnly();

        const { data, error } = await supabase
            .from("local_materials")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            console.error("ERREUR LECTURE LOCAL MATERIAL :", error);
            return null;
        }

        return mapRowToLocalMaterial(data);
    } catch (err) {
        console.error("ERREUR INATTENDUE GET LOCAL MATERIAL :", err);
        return null;
    }
}

/* ---------------------------------------------
 * ÉCRITURE (SERVER)
 * --------------------------------------------- */

/**
 * Crée une nouvelle ressource locale.
 */
export async function createLocalMaterial(payload: {
    name: string;
    iconUrl: string;
}): Promise<LocalMaterial> {
    const supabase = await createSupabaseServiceClient();

    const { data, error } = await supabase
        .from("local_materials")
        .insert({
            name: payload.name,
            icon_url: payload.iconUrl,
        })
        .select()
        .single();

    if (error) throw error;

    return mapRowToLocalMaterial(data);
}

/**
 * Met à jour une ressource locale existante.
 */
export async function updateLocalMaterial(
    id: number,
    payload: {
        name?: string;
        iconUrl?: string;
    }
): Promise<LocalMaterial> {
    const supabase = await createSupabaseServiceClient();

    const { data, error } = await supabase
        .from("local_materials")
        .update({
            ...(payload.name && { name: payload.name }),
            ...(payload.iconUrl && { icon_url: payload.iconUrl }),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return mapRowToLocalMaterial(data);
}

/**
 * Supprime une ressource locale.
 */
export async function deleteLocalMaterial(id: number): Promise<void> {
    const supabase = await createSupabaseServiceClient();

    const { error } = await supabase
        .from("local_materials")
        .delete()
        .eq("id", id);

    if (error) throw error;
}