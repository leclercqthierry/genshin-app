export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import Redirecting from "@/components/ui/feedback/redirecting";

import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import LocalMaterialForm from "../_components/local-material-form";
import { handleCreate } from "@/domain/local-material/actions/create";

export default async function NewLocalMaterialPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <AdminResourceCreatePage title="Nouvelle ressource locale">
            <LocalMaterialForm
                action={handleCreate}
                submitLabel="Ajouter la ressource locale"
                data-testid="local-material-form"
            />
        </AdminResourceCreatePage>
    );
}