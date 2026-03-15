export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import DungeonDropSetForm from './../../_components/dungeon-drop-set-form';

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/dungeon-drop-set/actions/update";
import { dungeonDropSetService } from "@/services/supabase/dungeon-drop-set";


type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditDungeonDropSetPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const dungeonDropSet = await dungeonDropSetService.getOne(Number(id));

    if (!dungeonDropSet) {
        return <p>Set de drops de donjon introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier le set de drops de donjon">
            <DungeonDropSetForm
                action={handleUpdate.bind(null, dungeonDropSet.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: dungeonDropSet.name,
                    rarity2_url: dungeonDropSet.rarity2Url,
                    rarity3_url: dungeonDropSet.rarity3Url,
                    rarity4_url: dungeonDropSet.rarity4Url,
                }}
            />
        </AdminResourceEditPage>
    );
}