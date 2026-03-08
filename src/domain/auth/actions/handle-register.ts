"use server";

import { redirect } from "next/navigation";
import { parseRegisterForm } from "../logic/parse-register";
import { registerUser } from "../logic/register-user";
import { createSupabaseServiceClient } from "@/lib/utils/supabase/service";
import { createProfile, deleteUser } from "@/services/supabase/user";
import type { RegisterFormState } from "@/app/auth/register/types";

export async function handleRegister(
    _prevState: RegisterFormState,
    formData: FormData
): Promise<RegisterFormState> {
    const parsed = parseRegisterForm(formData);

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
            message: null
        };
    }

    const supabase = await createSupabaseServiceClient();

    const result = await registerUser(
        {
            signUp: async (email, password) => {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${process.env.SITE_URL}/auth/account-confirmed`,
                    },
                });

                return {
                    userId: data?.user?.id ?? null,
                    error: error?.message ?? null,
                };
            },
            createProfile: async (userId, pseudo) => {
                try {
                    await createProfile(userId, pseudo);
                    return "ok";
                } catch {
                    return "error";
                }
            },
            deleteUser,
        },
        parsed.data
    );

    // 🔥 Redirection en cas de succès
    if (result.success) {
        redirect("/auth/email-sent");
    }

    return result;
}