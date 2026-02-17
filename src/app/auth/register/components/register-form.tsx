"use client";

import { useActionState } from "react";
import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/schemas/registerSchema";
import { handleRegister } from "../actions";
import { initialRegisterState } from "../types";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppFormSection from "@/components/ui/form/app-form-section";
import AppFormActions from "@/components/ui/form/app-form-actions";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";

export default function RegisterForm() {
    const [state, formAction] = useActionState(handleRegister, initialRegisterState);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    useEffect(() => {
        if (state.success) {
            router.push("/auth/email-sent");
        }
    }, [state.success, router]);

    const onSubmit = (data: RegisterSchema) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        startTransition(() => {
            formAction(formData);
        });
    };

    return (
        <AppFormWrapper onSubmit={handleSubmit(onSubmit)} size="md" variant="default">
            <AppFormSection withBorder={false}>
                <AppFieldBase
                    label="Pseudo"
                    name="pseudo"
                    required
                    error={errors.pseudo?.message || state.errors.pseudo?.[0]}
                >
                    <AppInput type="text" {...register("pseudo")} />
                </AppFieldBase>

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

                <AppFieldBase
                    label="Répéter le mot de passe"
                    name="password2"
                    required
                    error={errors.password2?.message || state.errors.password2?.[0]}
                >
                    <AppInput type="password" {...register("password2")} />
                </AppFieldBase>

                {state.message && (
                    <p className="text-red-400 text-sm">{state.message}</p>
                )}
            </AppFormSection>

            <AppFormActions align="right">
                <AppButton type="submit" full variant="primary" disabled={!isValid}>
                    S&apos;inscrire
                </AppButton>
            </AppFormActions>
        </AppFormWrapper>
    );
}