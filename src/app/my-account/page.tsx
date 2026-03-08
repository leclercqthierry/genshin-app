import PageHero from "@/components/layout/page-hero";
import Redirecting from "@/components/ui/feedback/redirecting";
import { requireUser } from '@/services/auth/require-user';

export default async function MyAccountPage() {
    const { redirect, profile } = await requireUser();

    if (redirect) return <Redirecting />;

    return (
        <>
            <PageHero title="Espace Membre">
                Bienvenue {profile?.pseudo ?? "utilisateur"}.
            </PageHero>
        </>
    );
}