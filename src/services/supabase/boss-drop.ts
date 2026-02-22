import { createSupabaseServer } from "@/lib/utils/supabase/server";
import { createSupabaseServerReadOnly } from "@/lib/utils/supabase/serverReadOnly";
import type { BossDrop } from "@/domain/boss-drop/types";
import { mapRowToBossDrop } from "@/domain/boss-drop/mapper";

/* ---------------------------------------------
 * LECTURE (READ-ONLY)
 * --------------------------------------------- */

/**
 * Récupère tous les drops de boss (lecture seule).
 */
export async function getBossDrops(): Promise<BossDrop[]> {
    try {
        const supabase = await createSupabaseServerReadOnly();

        const { data, error } = await supabase
            .from("boss_drops")
            .select("*")
            .order("name", { ascending: true });

        if (error) {
            console.error("ERREUR LECTURE BOSS DROPS :", error);
            return [];
        }

        return (data ?? []).map(mapRowToBossDrop);
    } catch (err) {
        console.error("ERREUR INATTENDUE GET BOSS DROPS :", err);
        return [];
    }
}

/**
 * Récupère un drop de boss spécifique (lecture seule).
 */
export async function getBossDrop(id: number): Promise<BossDrop | null> {
    try {
        const supabase = await createSupabaseServerReadOnly();

        const { data, error } = await supabase
            .from("boss_drops")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            console.error("ERREUR LECTURE BOSS DROP :", error);
            return null;
        }

        return mapRowToBossDrop(data);
    } catch (err) {
        console.error("ERREUR INATTENDUE GET BOSS DROP :", err);
        return null;
    }
}

/* ---------------------------------------------
 * ÉCRITURE (SERVER)
 * --------------------------------------------- */

/**
 * Crée un nouveau drop de boss.
 */
export async function createBossDrop(payload: {
    name: string;
    iconUrl: string;
}): Promise<BossDrop> {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
        .from("boss_drops")
        .insert({
            name: payload.name,
            icon_url: payload.iconUrl,
        })
        .select()
        .single();

    if (error) throw error;

    return mapRowToBossDrop(data);
}

/**
 * Met à jour un drop de boss existant.
 */
export async function updateBossDrop(
    id: number,
    payload: {
        name?: string;
        iconUrl?: string;
    }
): Promise<BossDrop> {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
        .from("boss_drops")
        .update({
            ...(payload.name && { name: payload.name }),
            ...(payload.iconUrl && { icon_url: payload.iconUrl }),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return mapRowToBossDrop(data);
}

/**
 * Supprime un drop de boss.
 */
export async function deleteBossDrop(id: number): Promise<void> {
    const supabase = await createSupabaseServer();

    const { error } = await supabase
        .from("boss_drops")
        .delete()
        .eq("id", id);

    if (error) throw error;
}