import { createBaseSetCrud } from "./shared/base-set-crud";
import { mapRowToEliteDropSet } from "@/domain/elite-drop-set/mapper";
import { EliteDropSet } from "@/domain/elite-drop-set/types";
import { EliteDropSetCreateRow, EliteDropSetRow, EliteDropSetUpdateRow } from "@/domain/elite-drop-set/db";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";

export async function makeEliteDropSetAdminService() {
    const supabase = await createSupabaseServiceClient();

    return createBaseSetCrud<
        EliteDropSet,
        EliteDropSetRow,
        EliteDropSetCreateRow,
        EliteDropSetUpdateRow
    >("elite_drop_sets", mapRowToEliteDropSet, supabase);
};

export async function makeEliteDropSetReadOnlyService() {
    const supabase = await createSupabaseClientReadOnly();

    return createBaseSetCrud<
        EliteDropSet,
        EliteDropSetRow,
        EliteDropSetCreateRow,
        EliteDropSetUpdateRow
    >("elite_drop_sets", mapRowToEliteDropSet, supabase);
};