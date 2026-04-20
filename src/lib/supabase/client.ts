import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseClient() {
    try {
        const cookieStore = await cookies();

        return createServerClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_PUBLISHABLE_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll().map((c) => ({
                            name: c.name,
                            value: c.value,
                        }));
                    },
                    setAll(cookiesToSet) {
                        for (const { name, value, options } of cookiesToSet) {
                            cookieStore.set(name, value, options);
                        }
                    },
                },
            }
        );
    } catch (err) {
        console.error("ERREUR CRÉATION CLIENT SUPABASE :", err);
        throw new Error("Impossible d'initialiser le client Supabase.");
    }
}