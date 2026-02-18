import { requireAdmin } from "@/services/auth/require-admin";
import Redirecting from "@/components/ui/feedback/redirecting";

import AdminHero from "@/components/ui/layout/admin-hero";
import AdminPageWrapper from "@/components/ui/layout/admin-page-wrapper";

import ElementForm from "../_components/element-form";
import { handleCreate } from "../_actions/create-element";

export default async function NewElementPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <>
            <AdminHero title="Nouvel élément" />

            <AdminPageWrapper>
                <ElementForm
                    action={handleCreate}
                    submitLabel="Ajouter l’élément"
                />
            </AdminPageWrapper>
        </>
    );
}