import { createClient } from "@supabase/supabase-js";

export async function createSupabaseServiceClient() {
    try {

        return createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SECRET_KEY!, // service role
        );
    } catch (err) {
        console.error("ERREUR CRÉATION CLIENT SUPABASE SERVICE :", err);
        throw new Error("Impossible d'initialiser le client Supabase service.");
    }
}