export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import LocalMaterialForm from "../../_components/local-material-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/local-material/actions/update";
import { localMaterialService } from "@/services/supabase/local-material";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditLocalMaterialPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const localMaterial = await localMaterialService.getOne(Number(id));

    if (!localMaterial) {
        return <p>Ressource locale introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier la ressource locale">
            <LocalMaterialForm
                action={handleUpdate.bind(null, localMaterial.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: localMaterial.name,
                    iconUrl: localMaterial.iconUrl,
                }}
            />
        </AdminResourceEditPage>
    );
}