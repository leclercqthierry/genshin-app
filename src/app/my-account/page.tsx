export const dynamic = "force-dynamic";

import PageHero from "@/components/layout/page-hero";
import AppButton from "@/components/ui/button/app-button";
import Redirecting from "@/components/ui/feedback/redirecting";
import { requireUser } from '@/services/auth/require-user';
import { deleteAccount } from "./actions/delete-account";

export default async function MyAccountPage() {
    const { redirect, profile } = await requireUser();

    if (redirect) return <Redirecting />;

    return (
        <div>
            <PageHero title="Espace Membre">
                Bienvenue {profile?.pseudo ?? "utilisateur"}.
            </PageHero>

            <div className="flex justify-evenly items-center">
                <AppButton
                    variant="primary"
                    href="/my-account/change-pseudo"
                >
                    Changer mon pseudo
                </AppButton>
                <AppButton
                    variant="primary"
                    onClick={deleteAccount}
                >
                    Supprimer mon compte
                </AppButton>
            </div>
        </div>
    );
}