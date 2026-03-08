"use client";

import AuthPageLayout from "@/components/ui/layout/auth-page-layout";
import LoginForm from "./_components/login-form";

export default function LoginPage() {

    return (
        <AuthPageLayout title="Connexion">
            <LoginForm />
        </AuthPageLayout>
    );
}