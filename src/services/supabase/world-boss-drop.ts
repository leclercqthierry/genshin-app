import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import { createBaseItemCrud } from "./shared/base-item-crud";
import { createSupabaseServiceClient } from '@/lib/supabase/service';

export async function makeWorldBossDropAdminService() {
    const supabase = await createSupabaseServiceClient();
    return createBaseItemCrud("world_boss_drops", supabase);
}

export async function makeWorldBossDropReadOnlyService() {
    const supabase = await createSupabaseClientReadOnly();
    return createBaseItemCrud("world_boss_drops", supabase);
}