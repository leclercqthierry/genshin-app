"use server";

import { loginSchema } from "@/schemas/loginSchema";
import { createSupabaseServer } from "@/lib/utils/supabase/server";
import type { LoginFormState } from "./types";
import { getProfile } from "@/services/supabase/user"; // ← à adapter selon ton arborescence

export async function handleLogin(
    _prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
    try {
        const raw = {
            email: formData.get("email")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
        };

        const parsed = loginSchema.safeParse(raw);

        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        const supabase = await createSupabaseServer();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: parsed.data.email,
            password: parsed.data.password,
        });

        if (error || !data.user) {
            return {
                success: false,
                errors: {},
                message: "Identifiants incorrects",
            };
        }

        // ⭐ On récupère le profil pour connaître le rôle
        const profile = await getProfile(data.user.id);

        return {
            success: true,
            errors: {},
            role: profile?.role === "admin" ? "admin" : "user", // ← ajout propre
        };
    } catch (err) {
        console.error("LOGIN ERROR", err);
        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue",
        };
    }
}