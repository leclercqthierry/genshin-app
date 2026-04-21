export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import EliteDropSetForm from "../../_components/elite-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/elite-drop-set/actions/update";
import { makeEliteDropSetAdminService } from "@/services/supabase/elite-drop-set";


type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditEliteDropSetPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const eliteDropSetAdminService = await makeEliteDropSetAdminService();
    const eliteDropSet = await eliteDropSetAdminService.getOne(Number(id));

    if (!eliteDropSet) {
        return <p>Set de drops de mobs elite introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier le set de drops de mobs elite">
            <EliteDropSetForm
                action={handleUpdate.bind(null, eliteDropSet.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: eliteDropSet.name,
                    rarity2Url: eliteDropSet.rarity2Url,
                    rarity3Url: eliteDropSet.rarity3Url,
                    rarity4Url: eliteDropSet.rarity4Url,
                }}
            />
        </AdminResourceEditPage>
    );
}