import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createBaseItemCrud } from "./shared/base-item-crud";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";

export async function makeBossDropAdminService() {
    const supabase = await createSupabaseServiceClient();
    return createBaseItemCrud("boss_drops", supabase);
}

export async function makeBossDropReadOnlyService() {
    const supabase = await createSupabaseClientReadOnly();
    return createBaseItemCrud("boss_drops", supabase);
}