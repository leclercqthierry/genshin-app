"use client";

import AuthPageLayout from "@/components/ui/layout/auth-page-layout";
import ResetPasswordForm from "./components/reset-password-form";

export default function ResetPasswordPage() {
    return (
        <AuthPageLayout title="Réinitialiser le mot de passe">
            <ResetPasswordForm />
        </AuthPageLayout>
    );
}