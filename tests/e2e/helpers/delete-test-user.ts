import { createSupabaseServiceClient } from "@/lib/supabase/service";

export async function deleteTestUser(userId: string) {
    const supabase = await createSupabaseServiceClient();

    // 1. Supprimer le profil
    const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

    if (profileError) {
        console.error("Erreur suppression profil", profileError);
        throw profileError;
    }

    // 2. Supprimer l'utilisateur Auth
    const { error: userError } = await supabase.auth.admin.deleteUser(userId);

    if (userError) {
        console.error("Erreur suppression user", userError);
        throw userError;
    }
}
