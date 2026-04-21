import { createBaseSetCrud } from "./shared/base-set-crud";
import { mapRowToWeaponElevationSet } from "@/domain/weapon-elevation-set/mapper";
import { WeaponElevationSet } from "@/domain/weapon-elevation-set/types";
import { WeaponElevationSetCreateRow, WeaponElevationSetRow, WeaponElevationSetUpdateRow } from "@/domain/weapon-elevation-set/db";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";

export async function makeWeaponElevationSetAdminService() {
    const supabase = await createSupabaseServiceClient();
    return createBaseSetCrud<
        WeaponElevationSet,
        WeaponElevationSetRow,
        WeaponElevationSetCreateRow,
        WeaponElevationSetUpdateRow
    >("weapon_elevation_sets", mapRowToWeaponElevationSet, supabase);
};

export async function makeWeaponElevationSetReadOnlyService() {
    const supabase = await createSupabaseClientReadOnly();
    return createBaseSetCrud<
        WeaponElevationSet,
        WeaponElevationSetRow,
        WeaponElevationSetCreateRow,
        WeaponElevationSetUpdateRow
    >("weapon_elevation_sets", mapRowToWeaponElevationSet, supabase);
};
