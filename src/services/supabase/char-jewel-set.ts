import { createBaseSetCrud } from "./shared/base-set-crud";
import { mapRowToCharJewelSet } from "@/domain/char-jewel-set/mapper";
import type { CharJewelSetRow, CharJewelSetCreateRow, CharJewelSetUpdateRow } from '@/domain/char-jewel-set/db';
import type { CharJewelSet } from "@/domain/char-jewel-set/types";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";

export async function makeCharJewelSetAdminService() {
    const supabase = await createSupabaseServiceClient();
    return createBaseSetCrud<
        CharJewelSet,
        CharJewelSetRow,
        CharJewelSetCreateRow,
        CharJewelSetUpdateRow
    >("char_jewel_sets", mapRowToCharJewelSet, supabase);
};

export async function makeCharJewelSetReadOnlyService() {
    const supabase = await createSupabaseClientReadOnly();
    return createBaseSetCrud<
        CharJewelSet,
        CharJewelSetRow,
        CharJewelSetCreateRow,
        CharJewelSetUpdateRow
    >("char_jewel_sets", mapRowToCharJewelSet, supabase);
};