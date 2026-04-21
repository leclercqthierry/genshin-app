import { createBaseSetCrud } from "./shared/base-set-crud";
import { mapRowToAptitudeSet } from "@/domain/aptitude-set/mapper";
import { AptitudeSet } from "@/domain/aptitude-set/types";
import { AptitudeSetCreateRow, AptitudeSetRow, AptitudeSetUpdateRow } from "@/domain/aptitude-set/db";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";

export async function makeAptitudeSetAdminService() {
    const supabase = await createSupabaseServiceClient();
    return createBaseSetCrud<
        AptitudeSet,
        AptitudeSetRow,
        AptitudeSetCreateRow,
        AptitudeSetUpdateRow
    >("aptitude_sets", mapRowToAptitudeSet, supabase);
};

export async function makeAptitudeSetReadOnlyService() {
    const supabase = await createSupabaseClientReadOnly();
    return createBaseSetCrud<
        AptitudeSet,
        AptitudeSetRow,
        AptitudeSetCreateRow,
        AptitudeSetUpdateRow
    >("aptitude_sets", mapRowToAptitudeSet, supabase);
};