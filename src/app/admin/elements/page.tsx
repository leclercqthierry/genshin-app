export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import { getElements } from "@/services/supabase/element";
import { deleteElementAction } from "@/domain/element/actions/delete";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import ElementCard from "@/domain/element/card";

export default async function ElementsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const elements = await getElements();

    return (
        <AdminResourcePage
            title="Gestion des éléments"
            description="Ces éléments seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            createHref="/admin/elements/new"
            items={elements}
            variant={"compact"}
            renderItem={(element) => (
                <ElementCard
                    key={element.id}
                    element={element}
                    onDelete={deleteElementAction}
                />
            )}
        />
    );
}