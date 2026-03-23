export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import CharJewelSetForm from "../../_components/char-jewel-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/char-jewel-set/actions/update";
import { charJewelSetService } from "@/services/supabase/char-jewel-set";
import { elementService } from "@/services/supabase/element";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditCharJewelSetPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const charJewelSet = await charJewelSetService.getOne(Number(id));

    if (!charJewelSet) {
        return <p>Set de joyaux introuvable.</p>;
    }

    // ⭐ Charger les éléments pour le select
    const elements = await elementService.getAll();

    return (
        <AdminResourceEditPage title="Modifier le set de joyaux de personnage">
            <CharJewelSetForm
                action={handleUpdate.bind(null, charJewelSet.id)}
                submitLabel="Mettre à jour"
                elements={elements} // ⭐ obligatoire
                defaultValues={{
                    name: charJewelSet.name,
                    elementId: charJewelSet.elementId,
                    rarity2_url: charJewelSet.rarity2Url,
                    rarity3_url: charJewelSet.rarity3Url,
                    rarity4_url: charJewelSet.rarity4Url,
                    rarity5_url: charJewelSet.rarity5Url,
                }}
            />
        </AdminResourceEditPage>
    );
}