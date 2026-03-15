import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

import type { BaseItem } from "@/domain/shared/base-item/types";
import type { BaseItemRow, BaseItemCreateRow, BaseItemUpdateRow } from "@/domain/shared/base-item/db";
import { mapRowToBaseItem } from "@/domain/shared/base-item/mapper";

export function createBaseItemCrud(table: string) {
    return {
        async getAll(): Promise<BaseItem[]> {
            const supabase = await createSupabaseClientReadOnly();
            const { data, error } = await supabase
                .from(table)
                .select("*")
                .order("name", { ascending: true });

            if (error) {
                console.error(`ERREUR LECTURE ${table} :`, error);
                return [];
            }

            return (data ?? []).map(mapRowToBaseItem);
        },

        async getOne(id: number): Promise<BaseItem | null> {
            const supabase = await createSupabaseClientReadOnly();
            const { data, error } = await supabase
                .from(table)
                .select("*")
                .eq("id", id)
                .single();

            if (error || !data) {
                console.error(`ERREUR LECTURE ${table} ID=${id} :`, error);
                return null;
            }

            return mapRowToBaseItem(data as BaseItemRow);
        },

        async create(payload: BaseItemCreateRow): Promise<BaseItem> {
            const supabase = await createSupabaseServiceClient();

            const { data, error } = await supabase
                .from(table)
                .insert(payload)
                .select()
                .single();

            if (error) throw error;

            return mapRowToBaseItem(data as BaseItemRow);
        },

        async update(id: number, payload: BaseItemUpdateRow): Promise<BaseItem> {
            const supabase = await createSupabaseServiceClient();

            const { data, error } = await supabase
                .from(table)
                .update(payload)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;

            return mapRowToBaseItem(data as BaseItemRow);
        },

        async remove(id: number): Promise<void> {
            const supabase = await createSupabaseServiceClient();
            const { error } = await supabase.from(table).delete().eq("id", id);
            if (error) throw error;
        },
    };
}