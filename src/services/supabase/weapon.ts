import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

import type { Weapon } from "@/domain/weapon/types";
import type { WeaponRow, WeaponCreateRow, WeaponUpdateRow } from "@/domain/weapon/db";
import { mapRowToWeapon } from "@/domain/weapon/mapper";

export function weaponCrud() {
    return {
        async getAll(): Promise<Weapon[]> {
            const supabase = await createSupabaseClientReadOnly();
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
            const supabase = await createSupabaseClientReadOnly();
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
            const supabase = await createSupabaseServiceClient();

            const { data, error } = await supabase
                .from("weapons")
                .insert(payload)
                .select()
                .single();

            if (error) throw error;

            return mapRowToWeapon(data as WeaponRow);
        },

        async update(id: number, payload: WeaponUpdateRow): Promise<Weapon> {
            const supabase = await createSupabaseServiceClient();

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
            const supabase = await createSupabaseServiceClient();
            const { error } = await supabase.from("weapons").delete().eq("id", id);
            if (error) throw error;
        },
    };
}

export const weaponService = weaponCrud();