import { BaseSet } from "@/domain/shared/base-set/types";
import { BaseSetCreateRow, BaseSetRow, BaseSetUpdateRow } from "@/domain/shared/base-set/db";
import { SupabaseClient } from "@supabase/supabase-js";

export function createBaseSetCrud<
    TDomain extends BaseSet,
    TRow extends BaseSetRow,
    TCreateRow extends BaseSetCreateRow,
    TUpdateRow extends BaseSetUpdateRow
>(
    table: string,
    mapRowToDomain: (row: TRow) => TDomain,
    supabase: SupabaseClient
) {
    return {
        async getAll(): Promise<TDomain[]> {
            const { data } = await supabase
                .from(table)
                .select("*")
                .order("name", { ascending: true });

            return (data ?? []).map((row) =>
                mapRowToDomain(row as TRow)
            );
        },

        async getOne(id: number): Promise<TDomain | null> {
            const { data } = await supabase
                .from(table)
                .select("*")
                .eq("id", id)
                .single();

            return data ? mapRowToDomain(data as TRow) : null;
        },

        async create(payload: TCreateRow): Promise<TDomain> {

            const { data, error } = await supabase
                .from(table)
                .insert(payload)
                .select()
                .single();

            if (error) throw error;

            return mapRowToDomain(data as TRow);
        },

        async update(id: number, payload: TUpdateRow): Promise<TDomain> {

            const { data, error } = await supabase
                .from(table)
                .update(payload)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;

            return mapRowToDomain(data as TRow);
        },

        async remove(id: number): Promise<void> {
            const { error } = await supabase.from(table).delete().eq("id", id);
            if (error) throw error;
        },
    };
}