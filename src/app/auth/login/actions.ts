"use server";

import { loginSchema } from "@/schemas/loginSchema";
import { createSupabaseServer } from "@/lib/utils/supabase/server";
import type { LoginFormState } from "./types";

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

        const { error } = await supabase.auth.signInWithPassword({
            email: parsed.data.email,
            password: parsed.data.password,
        });

        if (error) {
            return {
                success: false,
                errors: {},
                message: "Identifiants incorrects",
            };
        }

        return { success: true, errors: {} };
    } catch (err) {
        console.error("LOGIN ERROR", err);
        return {
            success: false,
            errors: {},
            message: "Une erreur inattendue est survenue",
        };
    }
}