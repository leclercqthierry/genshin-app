export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import Redirecting from "@/components/ui/feedback/redirecting";

import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import ElementForm from "../_components/element-form";
import { handleCreate } from "@/domain/element/actions/create";

export default async function NewElementPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <AdminResourceCreatePage title="Nouvel élément">
            <ElementForm
                action={handleCreate}
                submitLabel="Ajouter l’élément"
            />
        </AdminResourceCreatePage>
    );
}