export const dynamic = "force-dynamic";

import AuthPageLayout from "@/components/ui/layout/auth-page-layout";
import { ChangePseudoForm } from "./_components/change-pseudo-form";
import { requireUser } from "@/services/auth/require-user";

export default async function ChangePseudoPage() {

    const result = await requireUser();
    if (result.redirect || result.user === undefined) {
        return null;
    }

    const { profile } = result;
    return (
        <AuthPageLayout title="Changer mon pseudo">
            <ChangePseudoForm defaultPseudo={profile.pseudo ?? ""} />
        </AuthPageLayout>
    );
}

// reste à faire (lorsque les fonctionnalités seront dev):
// - Composant qui affiche les builds de personnages créés par l'user
// - Composant qui affiche les teams créées par l'user