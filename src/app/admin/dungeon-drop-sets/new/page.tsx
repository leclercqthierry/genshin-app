export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import DungeonDropSetForm from "../_components/dungeon-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleCreate } from "@/domain/dungeon-drop-set/actions/create";

export default async function NewDungeonDropSetPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <AdminResourceCreatePage title="Nouveau set de drop de donjon">
            <DungeonDropSetForm
                action={handleCreate}
                submitLabel="Ajouter le set de drop de donjon"
            />
        </AdminResourceCreatePage>
    );
}