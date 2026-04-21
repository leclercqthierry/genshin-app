import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createBaseItemCrud } from "./shared/base-item-crud";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";

export async function makeLocalMaterialAdminService() {
    const supabase = await createSupabaseServiceClient();
    return createBaseItemCrud("local_materials", supabase);
};

export async function makeLocalMaterialReadOnlyService() {
    const supabase = await createSupabaseClientReadOnly();
    return createBaseItemCrud("local_materials", supabase);
}