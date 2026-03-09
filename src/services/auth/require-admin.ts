import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import { getProfile } from "@/services/supabase/user";

export async function requireAdmin() {

    try {
        const supabase = await createSupabaseClientReadOnly();

        const { data, error } = await supabase.auth.getUser();

        if (error) {
            console.error("ERREUR AUTHENTIFICATION ADMIN :", error);
            return { redirect: true };
        }

        const user = data.user;

        if (!user) {
            return { redirect: true };
        }

        const profile = await getProfile(supabase, user.id);

        if (!profile) {
            console.error("PROFIL ADMIN INTROUVABLE :", user.id);
            return { redirect: true };
        }

        if (profile.role !== "admin") {
            return { redirect: true };
        }

        return { user, profile };
    } catch (err) {
        console.error("ERREUR INATTENDUE REQUIRE ADMIN :", err);
        return { redirect: true };
    }
}