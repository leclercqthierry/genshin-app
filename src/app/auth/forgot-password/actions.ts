"use server";

import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { createSupabaseServer } from "@/lib/utils/supabase/server";
import type { ForgotPasswordFormState } from "./types";

export async function handleForgotPassword(
    _prevState: ForgotPasswordFormState,
    formData: FormData
): Promise<ForgotPasswordFormState> {
    try {
        // 1. Extraction des données
        const raw = {
            email: formData.get("email")?.toString() ?? "",
        };

        // 2. Validation Zod
        const parsed = forgotPasswordSchema.safeParse(raw);

        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        // 3. Supabase côté serveur
        const supabase = await createSupabaseServer();

        // 4. Envoi de l’email de réinitialisation
        const { error } = await supabase.auth.resetPasswordForEmail(
            parsed.data.email,
            {
                redirectTo: `${process.env.SITE_URL}/auth/reset-password`,
            }
        );

        // 5. Gestion des erreurs Supabase
        if (error) {
            return {
                success: false,
                errors: {},
                message: "Une erreur est survenue. Réessayez plus tard.",
            };
        }

        // 6. Succès
        return {
            success: true,
            errors: {},
            message: "Un lien de réinitialisation a été envoyé à votre email.",
        };
    } catch {
        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue.",
        };
    }
}