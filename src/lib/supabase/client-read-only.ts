import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Client Supabase en lecture seule.
 *
 * À utiliser dans :
 * - RootLayout
 * - Layouts
 * - Pages server
 * - Loaders
 *
 * ⚠️ Cette version NE MODIFIE PAS les cookies.
 * Elle permet de lire la session utilisateur
 * sans déclencher d’erreur Next.js 16.
 */
export async function createSupabaseClientReadOnly() {
    try {
        const cookieStore = await cookies();

        return createServerClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_PUBLISHABLE_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set() { },
                    remove() { },
                },
            }
        );
    } catch (err) {
        console.error("ERREUR CRÉATION CLIENT SUPABASE (READ-ONLY) :", err);
        throw new Error("Impossible d'initialiser Supabase en lecture seule.");
    }
}