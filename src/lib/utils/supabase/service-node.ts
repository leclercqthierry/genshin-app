import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase service role en mode Node pur.
 * Utilisé EXCLUSIVEMENT dans les tests d'intégration CRUD.
 * Aucun cookies(), aucun SSR, aucun Next.js.
 */
export function createSupabaseServiceClientNode() {
    return createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!, // service role
        {
            auth: {
                persistSession: false,
            },
        }
    );
}