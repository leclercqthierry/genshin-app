"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/domain/auth/schema/login";
import { startTransition, useActionState } from "react";
import { handleLogin } from "@/domain/auth/actions/handle-login";
import { initialLoginState } from "../types";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppSection from "@/components/ui/layout/app-section";
import AppFormActions from "@/components/ui/form/app-form-actions";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";
import NavLink from "@/components/ui/navigation/nav-link";

export default function LoginForm() {
    const [state, formAction] = useActionState(handleLogin, initialLoginState);

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

    return (
        <AppFormWrapper onSubmit={handleSubmit(onSubmit)} size="md" variant="default">
            <AppSection variant="ghost">
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
            </AppSection>

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