export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import CharJewelSetForm from "../_components/char-jewel-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleCreate } from "@/domain/char-jewel-set/actions/create";
import { getElements } from "@/services/supabase/element";

export default async function NewCharJewelSetPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const elements = await getElements();

    return (
        <AdminResourceCreatePage title="Nouveau set de joyaux de personnage">
            <CharJewelSetForm
                action={handleCreate}
                submitLabel="Ajouter le set de joyaux"
                elements={elements}
            />
        </AdminResourceCreatePage>
    );
}