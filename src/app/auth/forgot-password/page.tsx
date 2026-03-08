"use client";

import AuthPageLayout from "@/components/ui/layout/auth-page-layout";
import ForgotPasswordForm from "./_components/forgot-password-form";

export default function ForgotPasswordPage() {
    return (
        <AuthPageLayout title="Mot de passe oublié">
            <ForgotPasswordForm />
        </AuthPageLayout>
    );
}