export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import EliteDropSetForm from "../_components/elite-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleCreate } from "@/domain/elite-drop-set/actions/create";

export default async function NewEliteDropSetPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <AdminResourceCreatePage title="Nouveau set de drops de mobs élite">
            <EliteDropSetForm
                action={handleCreate}
                submitLabel="Ajouter le set de drops de mobs élite"
            />
        </AdminResourceCreatePage>
    );
}