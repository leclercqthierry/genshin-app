import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import type { WorldBossDrop } from "@/domain/world-boss-drop/types";
import { mapRowToWorldBossDrop } from "@/domain/world-boss-drop/mapper";

/* ---------------------------------------------
 * LECTURE (READ-ONLY)
 * --------------------------------------------- */

/**
 * Récupère tous les drops de boss (lecture seule).
 */
export async function getWorldBossDrops(): Promise<WorldBossDrop[]> {
    try {
        const supabase = await createSupabaseClientReadOnly();

        const { data, error } = await supabase
            .from("world_boss_drops")
            .select("*")
            .order("name", { ascending: true });

        if (error) {
            console.error("ERREUR LECTURE BOSS DROPS :", error);
            return [];
        }

        return (data ?? []).map(mapRowToWorldBossDrop);
    } catch (err) {
        console.error("ERREUR INATTENDUE GET BOSS DROPS :", err);
        return [];
    }
}

/**
 * Récupère un drop de boss spécifique (lecture seule).
 */
export async function getWorldBossDrop(id: number): Promise<WorldBossDrop | null> {
    try {
        const supabase = await createSupabaseClientReadOnly();

        const { data, error } = await supabase
            .from("world_boss_drops")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            console.error("ERREUR LECTURE BOSS DROP :", error);
            return null;
        }

        return mapRowToWorldBossDrop(data);
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
export async function createWorldBossDrop(payload: {
    name: string;
    iconUrl: string;
}): Promise<WorldBossDrop> {
    const supabase = await createSupabaseServiceClient();

    const { data, error } = await supabase
        .from("world_boss_drops")
        .insert({
            name: payload.name,
            icon_url: payload.iconUrl,
        })
        .select()
        .single();

    if (error) throw error;

    return mapRowToWorldBossDrop(data);
}

/**
 * Met à jour un drop de boss existant.
 */
export async function updateWorldBossDrop(
    id: number,
    payload: {
        name?: string;
        iconUrl?: string;
    }
): Promise<WorldBossDrop> {
    const supabase = await createSupabaseServiceClient();

    const { data, error } = await supabase
        .from("world_boss_drops")
        .update({
            ...(payload.name && { name: payload.name }),
            ...(payload.iconUrl && { icon_url: payload.iconUrl }),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return mapRowToWorldBossDrop(data);
}

/**
 * Supprime un drop de boss.
 */
export async function deleteWorldBossDrop(id: number): Promise<void> {
    const supabase = await createSupabaseServiceClient();

    const { error } = await supabase
        .from("world_boss_drops")
        .delete()
        .eq("id", id);

    if (error) throw error;
}