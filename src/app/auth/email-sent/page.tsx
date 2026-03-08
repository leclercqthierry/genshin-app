"use client";

import AuthPageLayout from "@/components/ui/layout/auth-page-layout";

export default function EmailSentPage() {
    return (
        <AuthPageLayout title="Compte activé">
            <div className="space-y-6 text-center text-white/80">

                <p>
                    Vérifiez votre email
                </p>

                <p className="text-gray-300 mb-6">
                    Un email de confirmation vous a été envoyé.
                    Cliquez sur le lien pour activer votre compte.
                </p>
            </div>
        </AuthPageLayout>
    );
}