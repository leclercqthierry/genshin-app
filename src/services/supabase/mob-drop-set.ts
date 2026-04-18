import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

import type { MobDropSet } from "@/domain/mob-drop-set/types";
import type { MobDropSetRow, MobDropSetCreateRow, MobDropSetUpdateRow } from "@/domain/mob-drop-set/db";
import { mapRowToMobDropSet } from "@/domain/mob-drop-set/mapper";

export const mobDropSetService = {
    async getAll(): Promise<MobDropSet[]> {
        const supabase = await createSupabaseClientReadOnly();
        const { data, error } = await supabase
            .from("mob_drop_sets")
            .select("*")
            .order("name", { ascending: true });

        if (error) {
            console.error("ERREUR LECTURE MOB DROP SETS :", error);
            return [];
        }

        return (data ?? []).map(mapRowToMobDropSet);
    },

    async getOne(id: number): Promise<MobDropSet | null> {
        const supabase = await createSupabaseClientReadOnly();
        const { data, error } = await supabase
            .from("mob_drop_sets")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            console.error(`ERREUR LECTURE MOB DROP SET ID=${id} :`, error);
            return null;
        }

        return mapRowToMobDropSet(data as MobDropSetRow);
    },

    async create(payload: MobDropSetCreateRow): Promise<MobDropSet> {
        const supabase = await createSupabaseServiceClient();

        const { data, error } = await supabase
            .from("mob_drop_sets")
            .insert(payload)
            .select()
            .single();

        if (error) throw error;

        return mapRowToMobDropSet(data as MobDropSetRow);
    },

    async update(id: number, payload: MobDropSetUpdateRow): Promise<MobDropSet> {
        const supabase = await createSupabaseServiceClient();

        const { data, error } = await supabase
            .from("mob_drop_sets")
            .update(payload)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return mapRowToMobDropSet(data as MobDropSetRow);
    },

    async remove(id: number): Promise<void> {
        const supabase = await createSupabaseServiceClient();
        const { error } = await supabase
            .from("mob_drop_sets")
            .delete()
            .eq("id", id);

        if (error) throw error;
    },
};
