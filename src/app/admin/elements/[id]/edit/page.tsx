import { requireAdmin } from "@/services/auth/require-admin";
import Redirecting from "@/components/ui/feedback/redirecting";

import AdminHero from "@/components/ui/layout/admin-hero";
import AdminPageWrapper from "@/components/ui/layout/admin-page-wrapper";

import ElementForm from "../../_components/element-form";
import { handleUpdate } from "../../_actions/edit-element";
import { getElement } from "@/services/supabase/element";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditElementPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    // Next.js 16 → params est une Promise
    const { id } = await params;

    const element = await getElement(Number(id));

    if (!element) {
        return <p>Élément introuvable.</p>;
    }

    return (
        <>
            <AdminHero title="Modifier l’élément" />

            <AdminPageWrapper>
                <ElementForm
                    action={handleUpdate.bind(null, element.id)}
                    submitLabel="Mettre à jour"
                    defaultValues={{
                        name: element.name,
                        icon_url: element.iconUrl,
                    }}
                />
            </AdminPageWrapper>
        </>
    );
}