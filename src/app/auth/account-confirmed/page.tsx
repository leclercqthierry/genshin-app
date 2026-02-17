"use client";

import AuthPageLayout from "@/components/ui/layout/auth-page-layout";
import AppButton from "@/components/ui/button/app-button";
import NavLink from "@/components/ui/navigation/nav-link";

export default function AccountConfirmedPage() {
    return (
        <AuthPageLayout title="Compte activé">
            <div className="space-y-6 text-center text-white/80">

                <p>
                    Votre compte a été activé avec succès.
                    Vous pouvez maintenant vous connecter et accéder à votre espace.
                </p>

                <AppButton href="/auth/login" full>
                    Aller à la connexion
                </AppButton>

                <div>
                    <NavLink href="/auth/register">
                        Créer un autre compte
                    </NavLink>
                </div>
            </div>
        </AuthPageLayout>
    );
}