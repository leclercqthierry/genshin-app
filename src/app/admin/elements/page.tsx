export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import { getElements } from "@/services/supabase/element";
import { deleteElementAction } from "./_actions/delete-element";

import AdminHero from "@/components/ui/layout/admin-hero";
import AdminPageWrapper from "@/components/ui/layout/admin-page-wrapper";
import AdminGrid from "@/components/ui/layout/admin-grid";
import ElementCard from "@/components/ui/card/element-card";
import AppButton from "@/components/ui/button/app-button";
import Redirecting from "@/components/ui/feedback/redirecting";

export default async function ElementsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const elements = await getElements();

    return (
        <>
            <AdminHero title="Gestion des éléments">
                <AppButton href="/admin/elements/new">
                    Ajouter un élément
                </AppButton>

                <p className="text-center mt-6">
                    Ces éléments seront utilisés pour les personnages.
                    Il faut donc les créer AVANT ces derniers !
                </p>
            </AdminHero>

            <AdminPageWrapper>
                <AdminGrid variant="compact">
                    {elements.map((element) => (
                        <ElementCard
                            key={element.id}
                            element={element}
                            onDelete={deleteElementAction}
                        />
                    ))}
                </AdminGrid>
            </AdminPageWrapper>
        </>
    );
}