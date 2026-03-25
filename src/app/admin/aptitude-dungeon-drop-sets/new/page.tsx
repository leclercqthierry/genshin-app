export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import AptitudeDungeonDropSetForm from "../_components/aptitude-dungeon-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleCreate } from "@/domain/aptitude-dungeon-drop-set/actions/create";

export default async function NewAptitudeDungeonDropSetPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <AdminResourceCreatePage title="Nouveau set de drops de donjon d'aptitude">
            <AptitudeDungeonDropSetForm
                action={handleCreate}
                submitLabel="Ajouter le set de drops de donjon d'aptitude"
            />
        </AdminResourceCreatePage>
    );
}