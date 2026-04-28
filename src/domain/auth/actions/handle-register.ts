"use server";

import { redirect } from "next/navigation";
import { parseRegisterForm } from "@/domain/auth/logic/parse-register";
import { registerUser } from "@/domain/auth/logic/register-user";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createProfile, deleteUser } from "@/services/supabase/user";
import type { RegisterFormState } from "@/app/auth/register/types";
import { zodFieldErrorsSimple } from "@/lib/utils/zod-field-errors-simple";

export async function handleRegister(
    _prevState: RegisterFormState,
    formData: FormData
): Promise<RegisterFormState> {
    const parsed = parseRegisterForm(formData);

    if (!parsed.success) {
        return {
            success: false,
            errors: zodFieldErrorsSimple(parsed.error),
            message: null,
        };
    }

    // 🔥 1) Instanciation des clients
    const serviceClient = await createSupabaseServiceClient(); // service-role

    // 🔥 2) Injection dans RegisterDeps
    const result = await registerUser(
        {
            signUp: async (email, password) => {
                const { data, error } = await serviceClient.auth.signUp({
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
                    await createProfile(serviceClient, userId, pseudo);
                    return "ok";
                } catch {
                    return "error";
                }
            },

            deleteUser: async (userId) => {
                await deleteUser(serviceClient, userId);
            },
        },
        parsed.data
    );

    if (result.success) {
        redirect("/auth/email-sent");
    }

    return result;
}