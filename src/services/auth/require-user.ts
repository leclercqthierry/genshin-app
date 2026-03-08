import { createSupabaseClientReadOnly } from "@/lib/utils/supabase/client-read-only";
import { getProfile } from "@/services/supabase/user";

export async function requireUser() {

    // --- MODE NORMAL ---
    try {
        const supabase = await createSupabaseClientReadOnly();
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) return { redirect: true };

        const profile = await getProfile(data.user.id);
        if (!profile) return { redirect: true };

        if (profile.role !== "user") return { redirect: true };

        return { user: data.user, profile };
    } catch {
        return { redirect: true };
    }
}