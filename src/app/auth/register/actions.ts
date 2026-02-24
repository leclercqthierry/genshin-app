"use server";

import { registerSchema } from "@/schemas/registerSchema";
import { createSupabaseServer } from "@/lib/utils/supabase/service";
import { createProfile } from "@/services/supabase/user";
import { deleteUser } from "@/services/supabase/user";
import type { RegisterFormState } from "./types";

export async function handleRegister(
    _prevState: RegisterFormState,
    formData: FormData
): Promise<RegisterFormState> {
    try {
        // 1. Extraction
        const raw = {
            pseudo: formData.get("pseudo")?.toString() ?? "",
            email: formData.get("email")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
            password2: formData.get("password2")?.toString() ?? "",
        };

        // 2. Validation
        const parsed = registerSchema.safeParse(raw);
        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        // 3. Supabase
        const supabase = await createSupabaseServer();

        // 4. Création du compte
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
            email: parsed.data.email,
            password: parsed.data.password,
            options: {
                emailRedirectTo: `${process.env.SITE_URL}/auth/account-confirmed`,
            },
        });

        if (signUpError || !authData.user) {
            return {
                success: false,
                errors: {},
                message: signUpError?.message ?? "Impossible de créer le compte",
            };
        }

        const userId = authData.user.id;

        // 5. Création du profil
        try {
            await createProfile(userId, parsed.data.pseudo);
        } catch (err) {
            console.error("ERREUR DE CRÉATION DE PROFIL", err);

            // rollback complet
            try {
                await deleteUser(userId);
            } catch (rollbackErr) {
                console.error("ÉCHEC DE LA SUPPRESSION DE L'UTILISATEUR", rollbackErr);
            }

            return {
                success: false,
                errors: {},
                message: "Impossible de créer le profil utilisateur",
            };
        }

        return { success: true, errors: {} };
    } catch (err) {
        console.error("ERREUR D'INSCRIPTION", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue",
        };
    }
}