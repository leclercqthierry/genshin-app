"use server";

import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { createSupabaseServer } from "@/lib/utils/supabase/server";
import type { ForgotPasswordFormState } from "./types";

export async function handleForgotPassword(
    _prevState: ForgotPasswordFormState,
    formData: FormData
): Promise<ForgotPasswordFormState> {
    try {
        // 1. Extraction
        const raw = {
            email: formData.get("email")?.toString() ?? "",
        };

        // 2. Validation
        const parsed = forgotPasswordSchema.safeParse(raw);
        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            };
        }

        // 3. Supabase
        const supabase = await createSupabaseServer();

        // 4. Envoi du mail
        const { error } = await supabase.auth.resetPasswordForEmail(
            parsed.data.email,
            {
                redirectTo: `${process.env.SITE_URL}/auth/reset-password`,
            }
        );

        if (error) {
            console.error("ERREUR RÉINITIALISATION MOT DE PASSE :", error);

            return {
                success: false,
                errors: {},
                message: error.message ?? "Impossible d'envoyer l'email de réinitialisation.",
            };
        }

        return {
            success: true,
            errors: {},
            message: "Un lien de réinitialisation a été envoyé à votre adresse email.",
        };
    } catch (err) {
        console.error("ERREUR INATTENDUE RÉINITIALISATION :", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue.",
        };
    }
}