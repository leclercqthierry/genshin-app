export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import MobDropSetForm from "../_components/mob-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleCreate } from "@/domain/mob-drop-set/actions/create";

export default async function NewMobDropSetPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <AdminResourceCreatePage title="Nouveau set de drops de mobs">
            <MobDropSetForm
                action={handleCreate}
                submitLabel="Ajouter le set de drops de mobs"
            />
        </AdminResourceCreatePage>
    );
}