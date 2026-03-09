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
                    get(name) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name, value, options) {
                        cookieStore.set({ name, value, ...options });
                    },
                    remove(name, options) {
                        cookieStore.set({ name, value: "", ...options });
                    },
                },
            }
        );
    } catch (err) {
        console.error("ERREUR CRÉATION CLIENT SUPABASE :", err);
        throw new Error("Impossible d'initialiser le client Supabase.");
    }
}