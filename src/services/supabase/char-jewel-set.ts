import { createSupabaseServer } from "@/lib/utils/supabase/server";
import { createSupabaseServerReadOnly } from "@/lib/utils/supabase/serverReadOnly";

import type { CharJewelSet } from "@/domain/char-jewel-set/types";
import type { CharJewelSetRow } from "@/domain/char-jewel-set/db";
import { mapRowToCharJewelSet } from "@/domain/char-jewel-set/mapper";

/* ---------------------------------------------
 * LECTURE (READ-ONLY)
 * --------------------------------------------- */

export async function getCharJewelSets(): Promise<CharJewelSet[]> {
    try {
        const supabase = await createSupabaseServerReadOnly();

        const { data, error } = await supabase
            .from("char_jewel_sets")
            .select("*")
            .order("name", { ascending: true });

        if (error) {
            console.error("ERREUR LECTURE CHAR_JEWEL_SETS :", error);
            return [];
        }

        return (data ?? []).map(mapRowToCharJewelSet);
    } catch (err) {
        console.error("ERREUR INATTENDUE GET CHAR_JEWEL_SETS :", err);
        return [];
    }
}

export async function getCharJewelSet(id: number): Promise<CharJewelSet | null> {
    try {
        const supabase = await createSupabaseServerReadOnly();

        const { data, error } = await supabase
            .from("char_jewel_sets")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            console.error("ERREUR LECTURE CHAR_JEWEL_SET :", error);
            return null;
        }

        return mapRowToCharJewelSet(data);
    } catch (err) {
        console.error("ERREUR INATTENDUE GET CHAR_JEWEL_SET :", err);
        return null;
    }
}

/* ---------------------------------------------
 * ÉCRITURE (SERVER)
 * --------------------------------------------- */

type CreateCharJewelSetPayload = {
    name: string;
    elementId: number;
    rarity2Url: string;
    rarity3Url: string;
    rarity4Url: string;
    rarity5Url: string;
};

export async function createCharJewelSet(
    payload: CreateCharJewelSetPayload
): Promise<CharJewelSet> {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
        .from("char_jewel_sets")
        .insert({
            name: payload.name,
            element_id: payload.elementId,
            rarity2_url: payload.rarity2Url,
            rarity3_url: payload.rarity3Url,
            rarity4_url: payload.rarity4Url,
            rarity5_url: payload.rarity5Url,
        })
        .select()
        .single();

    if (error) throw error;

    return mapRowToCharJewelSet(data as CharJewelSetRow);
}

export async function updateCharJewelSet(
    id: number,
    payload: {
        name?: string;
        elementId?: number;
        rarity2Url?: string;
        rarity3Url?: string;
        rarity4Url?: string;
        rarity5Url?: string;
    }
): Promise<CharJewelSet> {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
        .from("char_jewel_sets")
        .update({
            ...(payload.name && { name: payload.name }),
            ...(payload.elementId && { element_id: payload.elementId }),
            ...(payload.rarity2Url && { rarity2_url: payload.rarity2Url }),
            ...(payload.rarity3Url && { rarity3_url: payload.rarity3Url }),
            ...(payload.rarity4Url && { rarity4_url: payload.rarity4Url }),
            ...(payload.rarity5Url && { rarity5_url: payload.rarity5Url }),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return mapRowToCharJewelSet(data as CharJewelSetRow);
}

export async function deleteCharJewelSet(id: number): Promise<void> {
    const supabase = await createSupabaseServer();

    const { error } = await supabase
        .from("char_jewel_sets")
        .delete()
        .eq("id", id);

    if (error) throw error;
}