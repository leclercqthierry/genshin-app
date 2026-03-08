"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    resetPasswordSchema,
    type ResetPasswordSchema,
} from "@/domain/auth/schema/reset-password";

import { handleResetPassword } from "@/domain/auth/actions/reset-password";
import { initialResetPasswordState } from "../types";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppFormSection from "@/components/ui/form/app-form-section";
import AppFormActions from "@/components/ui/form/app-form-actions";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";
import NavLink from "@/components/ui/navigation/nav-link";

export default function ResetPasswordForm() {
    const [state, formAction] = useActionState(
        handleResetPassword,
        initialResetPasswordState
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
    });

    const onSubmit = (data: ResetPasswordSchema) => {
        const formData = new FormData();
        formData.append("password", data.password);
        formData.append("password2", data.password2);
        formAction(formData);
    };

    return (
        <AppFormWrapper onSubmit={handleSubmit(onSubmit)} size="md" variant="default">

            {/* SECTION : Champs */}
            <AppFormSection withBorder={false}>
                <AppFieldBase
                    label="Nouveau mot de passe"
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
                    <p
                        className={
                            state.success ? "text-green-400 text-sm" : "text-red-400 text-sm"
                        }
                    >
                        {state.message}
                    </p>
                )}
            </AppFormSection>

            {/* ACTIONS */}
            <AppFormActions align="between">
                <NavLink className="h-5" href="/login">Retour</NavLink>

                <AppButton type="submit" disabled={!isValid}>
                    Mettre à jour
                </AppButton>
            </AppFormActions>

        </AppFormWrapper>
    );
}