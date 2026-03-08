import { createSupabaseServiceClient } from "@/lib/utils/supabase/service";
import { createSupabaseClientReadOnly } from "@/lib/utils/supabase/client-read-only";
import type { Element } from "@/domain/element/types";
import { mapRowToElement } from "@/domain/element/mapper";

/* ---------------------------------------------
 * LECTURE (READ-ONLY)
 * --------------------------------------------- */

/**
 * Récupère tous les éléments (lecture seule).
 */
export async function getElements(): Promise<Element[]> {
    try {
        const supabase = await createSupabaseClientReadOnly();

        const { data, error } = await supabase
            .from("elements")
            .select("*")
            .order("name", { ascending: true });

        if (error) {
            console.error("ERREUR LECTURE ELEMENTS :", error);
            return [];
        }

        return (data ?? []).map(mapRowToElement);
    } catch (err) {
        console.error("ERREUR INATTENDUE GET ELEMENTS :", err);
        return [];
    }
}

/**
 * Récupère un élément spécifique (lecture seule).
 */
export async function getElement(id: number): Promise<Element | null> {
    try {
        const supabase = await createSupabaseClientReadOnly();

        const { data, error } = await supabase
            .from("elements")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            console.error("ERREUR LECTURE ELEMENT :", error);
            return null;
        }

        return mapRowToElement(data);
    } catch (err) {
        console.error("ERREUR INATTENDUE GET ELEMENT :", err);
        return null;
    }
}

/* ---------------------------------------------
 * ÉCRITURE (SERVER)
 * --------------------------------------------- */

/**
 * Crée un nouvel élément.
 */
export async function createElement(payload: {
    name: string;
    iconUrl: string;
}): Promise<Element> {
    const supabase = await createSupabaseServiceClient();

    const { data, error } = await supabase
        .from("elements")
        .insert({
            name: payload.name,
            icon_url: payload.iconUrl,
        })
        .select()
        .single();

    if (error) throw error;

    return mapRowToElement(data);
}

/**
 * Met à jour un élément existant.
 */
export async function updateElement(
    id: number,
    payload: {
        name?: string;
        iconUrl?: string;
    }
): Promise<Element> {
    const supabase = await createSupabaseServiceClient();

    const { data, error } = await supabase
        .from("elements")
        .update({
            ...(payload.name && { name: payload.name }),
            ...(payload.iconUrl && { icon_url: payload.iconUrl }),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return mapRowToElement(data);
}

/**
 * Supprime un élément.
 */
export async function deleteElement(id: number): Promise<void> {
    const supabase = await createSupabaseServiceClient();

    const { error } = await supabase
        .from("elements")
        .delete()
        .eq("id", id);

    if (error) throw error;
}