import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createBaseItemCrud } from "./shared/base-item-crud";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";

export async function makeElementAdminService() {
    const supabase = await createSupabaseServiceClient();
    return createBaseItemCrud("elements", supabase);
}
export async function makeElementReadOnlyService() {
    const supabase = await createSupabaseClientReadOnly();
    return createBaseItemCrud("elements", supabase);
}