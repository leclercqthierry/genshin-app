"use server";

import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { createSupabaseServer } from "@/lib/utils/supabase/service";
import type { ResetPasswordFormState } from "./types";

export async function handleResetPassword(
    _prevState: ResetPasswordFormState,
    formData: FormData
): Promise<ResetPasswordFormState> {
    try {
        // 1. Extraction
        const raw = {
            password: formData.get("password")?.toString() ?? "",
            password2: formData.get("password2")?.toString() ?? "",
        };

        // 2. Validation
        const parsed = resetPasswordSchema.safeParse(raw);
        if (!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
                redirect: false,
            };
        }

        // 3. Supabase
        const supabase = await createSupabaseServer();

        // 4. Mise à jour du mot de passe
        const { error } = await supabase.auth.updateUser({
            password: parsed.data.password,
        });

        if (error) {
            console.error("ERREUR MISE À JOUR MOT DE PASSE :", error);

            return {
                success: false,
                errors: {},
                message: error.message ?? "Impossible de mettre à jour le mot de passe.",
                redirect: false,
            };
        }

        return {
            success: true,
            errors: {},
            message: "Mot de passe mis à jour avec succès !",
            redirect: true,
        };
    } catch (err) {
        console.error("ERREUR INATTENDUE RESET PASSWORD :", err);

        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue.",
            redirect: false,
        };
    }
}