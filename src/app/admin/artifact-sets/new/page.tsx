export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import ArtifactSetForm from "../_components/artifact-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleCreate } from "@/domain/artifact-set/actions/create";

export default async function NewArtifactSetPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <AdminResourceCreatePage title="Nouveau set d'artéfacts">
            <ArtifactSetForm
                action={handleCreate}
                submitLabel="Ajouter le set d'artéfacts"
            />
        </AdminResourceCreatePage>
    );
}