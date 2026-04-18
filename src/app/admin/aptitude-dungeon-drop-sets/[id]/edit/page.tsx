export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import AptitudeDungeonDropSetForm from "../../_components/aptitude-dungeon-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/aptitude-dungeon-drop-set/actions/update";
import { aptitudeDungeonDropSetService } from "@/services/supabase/aptitude-dungeon-drop-set";


type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditAptitudeDungeonDropSetPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const aptitudeDungeonDropSet = await aptitudeDungeonDropSetService.getOne(Number(id));

    if (!aptitudeDungeonDropSet) {
        return <p>Set de drops de donjon d&apos;aptitude introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier le set de drops de donjon d'aptitude">
            <AptitudeDungeonDropSetForm
                action={handleUpdate.bind(null, aptitudeDungeonDropSet.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: aptitudeDungeonDropSet.name,
                    rarity2Url: aptitudeDungeonDropSet.rarity2Url,
                    rarity3Url: aptitudeDungeonDropSet.rarity3Url,
                    rarity4Url: aptitudeDungeonDropSet.rarity4Url,
                }}
            />
        </AdminResourceEditPage>
    );
}