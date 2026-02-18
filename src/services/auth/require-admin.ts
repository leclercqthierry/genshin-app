import { createSupabaseServerReadOnly } from "@/lib/utils/supabase/serverReadOnly";
import { getProfile } from "../supabase/user";

export async function requireAdmin() {
    const supabase = await createSupabaseServerReadOnly();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { redirect: true };

    const profile = await getProfile(user.id);
    if (profile?.role !== "admin") return { redirect: true };

    return { user, profile };
}