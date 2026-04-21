export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import MobDropSetForm from "../../_components/mob-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/mob-drop-set/actions/update";
import { makeMobDropSetAdminService } from "@/services/supabase/mob-drop-set";


type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditMobDropSetPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const mobDropSetAdminService = await makeMobDropSetAdminService();
    const mobDropSet = await mobDropSetAdminService.getOne(Number(id));

    if (!mobDropSet) {
        return <p>Set de drops de mobs introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier le set de drops de mobs">
            <MobDropSetForm
                action={handleUpdate.bind(null, mobDropSet.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: mobDropSet.name,
                    rarity1Url: mobDropSet.rarity1Url,
                    rarity2Url: mobDropSet.rarity2Url,
                    rarity3Url: mobDropSet.rarity3Url,
                }}
            />
        </AdminResourceEditPage>
    );
}