// import { createClient } from "@supabase/supabase-js";
import { createSupabaseServiceClient } from '@/lib/supabase/service';

export async function createTestUser() {

    const supabase = await createSupabaseServiceClient();

    const email = `test-${crypto.randomUUID()}@example.com`;
    const password = "Password123!";

    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (error || !data.user) {
        console.error("Erreur création user", error);
        throw error;
    }

    const userId = data.user.id;
    const random = crypto.randomUUID().replace(/[^A-Za-z0-9]/g, "").slice(0, 6);

    // 2. Créer le profil associé
    const { error: profileError } = await supabase
        .from("profiles")
        .insert({
            id: userId,
            role: "user",
            pseudo: `TestUser${random}`,
        });

    if (profileError) {
        console.error("Erreur création profil", profileError);
        throw profileError;
    }

    return {
        id: userId,
        email,
        password,
    };
}
