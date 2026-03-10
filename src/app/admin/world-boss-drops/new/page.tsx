export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import Redirecting from "@/components/ui/feedback/redirecting";

import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import WorldBossDropForm from "../_components/world-boss-drop-form";
import { handleCreate } from "@/domain/world-boss-drop/actions/create";

export default async function NewWorldBossDropPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <AdminResourceCreatePage title="Nouveau drop de boss de monde">
            <WorldBossDropForm
                action={handleCreate}
                submitLabel="Ajouter le drop de boss de monde"
                data-testid="world-boss-drop-form"
            />
        </AdminResourceCreatePage>
    );
}