export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import AptitudeSetForm from "../../_components/aptitude-dungeon-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/aptitude-set/actions/update";
import { makeAptitudeSetAdminService } from "@/services/supabase/aptitude-set";


type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditAptitudeSetPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const aptitudeSetAdminService = await makeAptitudeSetAdminService();
    const aptitudeSet = await aptitudeSetAdminService.getOne(Number(id));

    if (!aptitudeSet) {
        return <p>Set de drops de donjon d&apos;aptitude introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier le set de drops de donjon d'aptitude">
            <AptitudeSetForm
                action={handleUpdate.bind(null, aptitudeSet.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: aptitudeSet.name,
                    rarity2Url: aptitudeSet.rarity2Url,
                    rarity3Url: aptitudeSet.rarity3Url,
                    rarity4Url: aptitudeSet.rarity4Url,
                }}
            />
        </AdminResourceEditPage>
    );
}