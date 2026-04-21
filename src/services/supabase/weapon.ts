import type { Weapon } from "@/domain/weapon/types";
import type { WeaponRow, WeaponCreateRow, WeaponUpdateRow } from "@/domain/weapon/db";
import { mapRowToWeapon } from "@/domain/weapon/mapper";
import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";

export function weaponCrud(supabase: SupabaseClient) {
    return {
        async getAll(): Promise<Weapon[]> {
            const { data, error } = await supabase
                .from("weapons")
                .select("*")
                .order("name", { ascending: true });

            if (error) {
                console.error("ERREUR LECTURE WEAPONS :", error);
                return [];
            }

            return (data ?? []).map(mapRowToWeapon);
        },

        async getOne(id: number): Promise<Weapon | null> {
            const { data, error } = await supabase
                .from("weapons")
                .select("*")
                .eq("id", id)
                .single();

            if (error || !data) {
                console.error(`ERREUR LECTURE WEAPONS ID=${id} :`, error);
                return null;
            }

            return mapRowToWeapon(data as WeaponRow);
        },

        async create(payload: WeaponCreateRow): Promise<Weapon> {

            const { data, error } = await supabase
                .from("weapons")
                .insert(payload)
                .select()
                .single();

            if (error) throw error;

            return mapRowToWeapon(data as WeaponRow);
        },

        async update(id: number, payload: WeaponUpdateRow): Promise<Weapon> {

            const { data, error } = await supabase
                .from("weapons")
                .update(payload)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;

            return mapRowToWeapon(data as WeaponRow);
        },

        async remove(id: number): Promise<void> {
            const { error } = await supabase.from("weapons").delete().eq("id", id);
            if (error) throw error;
        },
    };
}

export type WeaponReadOnlyService = Pick<
    ReturnType<typeof weaponCrud>,
    "getAll" | "getOne"
>;

export type WeaponAdminService = ReturnType<typeof weaponCrud>;

export async function makeWeaponAdminService(): Promise<WeaponAdminService> {
    const supabase = await createSupabaseServiceClient();
    return weaponCrud(supabase);
}

export async function makeWeaponReadOnlyService(): Promise<WeaponReadOnlyService> {
    const supabase = await createSupabaseClientReadOnly();
    return weaponCrud(supabase);
}