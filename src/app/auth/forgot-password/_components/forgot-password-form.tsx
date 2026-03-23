"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    forgotPasswordSchema,
    type ForgotPasswordSchema,
} from "@/domain/auth/schema/forgot-password";
import { handleForgotPassword } from "@/domain/auth/actions/forgot-password";
import { initialForgotPasswordState } from "../types";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppSection from "@/components/ui/layout/app-section";
import AppFormActions from "@/components/ui/form/app-form-actions";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";
import NavLink from "@/components/ui/navigation/nav-link";

export default function ForgotPasswordForm() {
    const [state, formAction] = useActionState(
        handleForgotPassword,
        initialForgotPasswordState
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
    });

    const onSubmit = (data: ForgotPasswordSchema) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formAction(formData);
    };

    return (
        <AppFormWrapper onSubmit={handleSubmit(onSubmit)} size="md" variant="default">

            {/* SECTION : Champs */}
            <AppSection variant="ghost">
                <AppFieldBase
                    label="Email"
                    name="email"
                    required
                    error={errors.email?.message || state.errors.email?.[0]}
                >
                    <AppInput type="email" {...register("email")} />
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
            </AppSection>

            {/* ACTIONS */}
            <AppFormActions align="between">
                <NavLink href="/login">Retour</NavLink>

                <AppButton type="submit" disabled={!isValid}>
                    Envoyer le lien
                </AppButton>
            </AppFormActions>

        </AppFormWrapper>
    );
}