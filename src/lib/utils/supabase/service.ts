import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServiceClient() {
    try {
        const cookieStore = await cookies();

        return createServerClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SECRET_KEY!, // service role
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
        console.error("ERREUR CRÉATION CLIENT SUPABASE SERVICE :", err);
        throw new Error("Impossible d'initialiser le client Supabase service.");
    }
}