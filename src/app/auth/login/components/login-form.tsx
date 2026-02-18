"use client";

import { useActionState } from "react";
import { startTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/loginSchema";
import { handleLogin } from "../actions";
import { initialLoginState } from "../types";
import { useRouter } from "next/navigation";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppFormSection from "@/components/ui/form/app-form-section";
import AppFormActions from "@/components/ui/form/app-form-actions";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";
import NavLink from "@/components/ui/navigation/nav-link";

export default function LoginForm() {
    const [state, formAction] = useActionState(handleLogin, initialLoginState);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmit = (data: LoginSchema) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // ⭐ On envoie l'action, mais SANS redirection ici
        startTransition(() => {
            formAction(formData);
        });
    };

    // ⭐ Redirection uniquement si le login a réussi
    useEffect(() => {
        if (state.success === true) {
            if (state.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/"); // plus tard: /mon-compte
            }
        }
    }, [state.success, state.role, router]);

    return (
        <AppFormWrapper onSubmit={handleSubmit(onSubmit)} size="md" variant="default">
            <AppFormSection withBorder={false}>
                <AppFieldBase
                    label="Email"
                    name="email"
                    required
                    error={errors.email?.message || state.errors.email?.[0]}
                >
                    <AppInput type="email" {...register("email")} />
                </AppFieldBase>

                <AppFieldBase
                    label="Mot de passe"
                    name="password"
                    required
                    error={errors.password?.message || state.errors.password?.[0]}
                >
                    <AppInput type="password" {...register("password")} />
                </AppFieldBase>

                {state.message && (
                    <p className="text-red-400 text-sm">{state.message}</p>
                )}
            </AppFormSection>

            <AppFormActions align="between">
                <NavLink href="/auth/forgot-password">
                    <i>Mot de passe oublié&nbsp;?</i>
                </NavLink>

                <AppButton type="submit" disabled={!isValid}>
                    Se connecter
                </AppButton>
            </AppFormActions>
        </AppFormWrapper>
    );
}