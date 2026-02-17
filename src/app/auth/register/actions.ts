"use server";

import { registerSchema } from "@/schemas/registerSchema";
import { createSupabaseServer } from "@/lib/utils/supabase/server";
import { createProfile } from "@/services/supabase/user";
import type { RegisterFormState } from "./types";

export async function handleRegister(
    _prevState: RegisterFormState,
    formData: FormData
): Promise<RegisterFormState> {
    try {
        // 1. Extraction des données
        const raw = {
            pseudo: formData.get("pseudo")?.toString() ?? "",
            email: formData.get("email")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
            password2: formData.get("password2")?.toString() ?? "",
        };

        // 2. Validation Zod
        const parsed = registerSchema.safeParse(raw);

        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        // 3. Supabase côté serveur
        const supabase = await createSupabaseServer();

        // 4. Création du compte
        const { data: authData, error } = await supabase.auth.signUp({
            email: parsed.data.email,
            password: parsed.data.password,
            options: {
                emailRedirectTo: `${process.env.SITE_URL}/auth/account-confirmed`,
            },
        });
        console.error("REGISTER ERROR DETAILS", error);

        if (error || !authData.user) {
            return {
                success: false,
                errors: {},
                message: "Impossible de créer le compte",
            };
        }

        // 5. Création du profil
        await createProfile(authData.user.id, parsed.data.pseudo);

        return { success: true, errors: {} };
    } catch {
        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue",
        };
    }
}