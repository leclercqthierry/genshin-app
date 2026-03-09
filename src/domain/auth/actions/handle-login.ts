"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/domain/auth/schema/login";
import { getProfile } from "@/services/supabase/user";
import type { LoginFormState } from "@/app/auth/login/types";
import { initialLoginState } from "@/app/auth/login/types";
import { createSupabaseClient } from "@/lib/supabase/client";

export async function handleLogin(
    _prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
    let profile: { role: string } | null = null;
    let role: "admin" | "user" | null = null;

    try {
        // 1. Extraction
        const raw = {
            email: formData.get("email")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
        };

        // 2. Validation
        const parsed = loginSchema.safeParse(raw);
        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
                message: null,
                role: null,
            };
        }

        // 3. Supabase
        const supabase = await createSupabaseClient();

        // 4. Tentative de connexion
        const { data, error } = await supabase.auth.signInWithPassword({
            email: parsed.data.email,
            password: parsed.data.password,
        });

        if (error || !data.user) {
            return {
                success: false,
                errors: {},
                message: error?.message ?? "Identifiants incorrects",
                role: null,
            };
        }

        // 5. Récupération du profil
        profile = await getProfile(supabase, data.user.id);

        if (!profile) {
            return {
                success: false,
                errors: {},
                message: "Profil utilisateur introuvable",
                role: null,
            };
        }

        // 6. Succès
        role = profile.role === "admin" ? "admin" : "user";

    } catch (err) {
        console.error("ERREUR DE CONNEXION", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue",
            role: null,
        };
    }

    // Redirection
    if (role === "admin") {
        redirect("/admin");
    }
    redirect("/my-account");

    // Ce return n'est jamais exécuté car redirect() coupe l'exécution.
    // Il existe uniquement pour satisfaire TypeScript et useActionState,
    // qui exigent que tous les chemins retournent un LoginFormState.
    return initialLoginState;

}