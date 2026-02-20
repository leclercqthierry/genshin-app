"use server";

import { createSupabaseServer } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
    try {
        const supabase = await createSupabaseServer();

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("ERREUR LORS DE LA DÉCONNEXION :", error);
            // On ne bloque pas la redirection, mais on logue l’erreur
        }
    } catch (err) {
        console.error("ERREUR INATTENDUE LORS DE LA DÉCONNEXION :", err);
        // Même logique : on redirige quand même
    }

    redirect("/auth/login");
}