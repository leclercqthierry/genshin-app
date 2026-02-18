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
export async function createSupabaseServerReadOnly() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set() {
                    // Lecture seule → aucune écriture autorisée
                },
                remove() {
                    // Lecture seule → aucune suppression autorisée
                },
            },
        }
    );
}