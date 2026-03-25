export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import WeaponElevationDungeonDropSetForm from "../../_components/weapon-elevation-dungeon-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/weapon-elevation-dungeon-drop-set/actions/update";
import { weaponElevationDungeonDropSetService } from "@/services/supabase/weapon-elevation-dungeon-drop-set";


type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditWeaponElevationDungeonDropSetPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const weaponElevationDungeonDropSet = await weaponElevationDungeonDropSetService.getOne(Number(id));

    if (!weaponElevationDungeonDropSet) {
        return <p>Set de drops de donjon d&apos;élévation d&apos;arme introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier le set de drops de donjon d'élévation d'arme">
            <WeaponElevationDungeonDropSetForm
                action={handleUpdate.bind(null, weaponElevationDungeonDropSet.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: weaponElevationDungeonDropSet.name,
                    rarity2_url: weaponElevationDungeonDropSet.rarity2Url,
                    rarity3_url: weaponElevationDungeonDropSet.rarity3Url,
                    rarity4_url: weaponElevationDungeonDropSet.rarity4Url,
                }}
            />
        </AdminResourceEditPage>
    );
}