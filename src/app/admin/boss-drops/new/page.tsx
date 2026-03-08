export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import Redirecting from "@/components/ui/feedback/redirecting";

import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import BossDropForm from "../_components/boss-drop-form";
import { handleCreate } from "@/domain/boss-drop/actions/create";

export default async function NewBossDropPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <AdminResourceCreatePage title="Nouveau drop de boss">
            <BossDropForm
                action={handleCreate}
                submitLabel="Ajouter le drop de boss"
                data-testid="boss-drop-form"
            />
        </AdminResourceCreatePage>
    );
}