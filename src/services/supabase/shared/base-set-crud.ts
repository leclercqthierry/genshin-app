import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { BaseSet } from "@/domain/shared/base-set/types";
import { BaseSetRow } from "@/domain/shared/base-set/db";

export function createBaseSetCrud<
    TDomain extends BaseSet,
    TRow extends BaseSetRow,
    TCreateRow
>(
    table: string,
    mapRowToDomain: (row: TRow) => TDomain
) {
    return {
        async getAll(): Promise<TDomain[]> {
            const supabase = await createSupabaseClientReadOnly();
            const { data } = await supabase
                .from(table)
                .select("*")
                .order("name", { ascending: true });

            return (data ?? []).map((row) =>
                mapRowToDomain(row as TRow)
            );
        },

        async getOne(id: number): Promise<TDomain | null> {
            const supabase = await createSupabaseClientReadOnly();
            const { data } = await supabase
                .from(table)
                .select("*")
                .eq("id", id)
                .single();

            return data ? mapRowToDomain(data as TRow) : null;
        },

        async create(payload: TCreateRow): Promise<TDomain> {
            const supabase = await createSupabaseServiceClient();

            const { data, error } = await supabase
                .from(table)
                .insert(payload)
                .select()
                .single();

            if (error) throw error;

            return mapRowToDomain(data as TRow);
        },

        async update(id: number, payload: Partial<TCreateRow>): Promise<TDomain> {
            const supabase = await createSupabaseServiceClient();

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
            const supabase = await createSupabaseServiceClient();
            const { error } = await supabase.from(table).delete().eq("id", id);
            if (error) throw error;
        },
    };
}