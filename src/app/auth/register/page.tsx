"use client";
export const dynamic = "force-dynamic";

import AuthPageLayout from "@/components/ui/layout/auth-page-layout";
import RegisterForm from "./_components/register-form";

export default function RegisterPage() {
    return (
        <AuthPageLayout title="Créer un compte">
            <RegisterForm />
        </AuthPageLayout>
    );
}