"use server";

import { loginSchema } from "@/schemas/loginSchema";
import { createSupabaseServer } from "@/lib/utils/supabase/server";
import { getProfile } from "@/services/supabase/user";
import type { LoginFormState } from "./types";

export async function handleLogin(
    _prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
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
            };
        }

        // 3. Supabase
        const supabase = await createSupabaseServer();

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
            };
        }

        // 5. Récupération du profil
        const profile = await getProfile(data.user.id);

        if (!profile) {
            return {
                success: false,
                errors: {},
                message: "Profil utilisateur introuvable",
            };
        }

        return {
            success: true,
            errors: {},
            role: profile.role === "admin" ? "admin" : "user",
        };
    } catch (err) {
        console.error("ERREUR DE CONNEXION", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue",
        };
    }
}