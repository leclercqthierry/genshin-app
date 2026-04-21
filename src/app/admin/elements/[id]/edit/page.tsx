export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import ElementForm from "../../_components/element-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/element/actions/update";
import { makeElementAdminService } from "@/services/supabase/element";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditElementPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const elementAdminService = await makeElementAdminService();
    const element = await elementAdminService.getOne(Number(id));

    if (!element) {
        return <p>Élément introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier l’élément">
            <ElementForm
                action={handleUpdate.bind(null, element.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: element.name,
                    iconUrl: element.iconUrl,
                }}
            />
        </AdminResourceEditPage>
    );
}