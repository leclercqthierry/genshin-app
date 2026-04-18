export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import WeaponElevationDungeonDropSetForm from "../../_components/weapon-elevation-dungeon-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/weapon-elevation-dungeon-drop-set/actions/update";
import { weaponElevationDungeonDropSetService } from "@/services/supabase/weapon-elevation-dungeon-drop-set";
import { FARM_DAYS } from "@/constants/farm-days";


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
                farmDays={FARM_DAYS}
                defaultValues={{
                    name: weaponElevationDungeonDropSet.name,
                    rarity2Url: weaponElevationDungeonDropSet.rarity2Url,
                    rarity3Url: weaponElevationDungeonDropSet.rarity3Url,
                    rarity4Url: weaponElevationDungeonDropSet.rarity4Url,
                    rarity5Url: weaponElevationDungeonDropSet.rarity5Url,
                    farmDaysIndex: weaponElevationDungeonDropSet.farmDaysIndex,
                }}
            />
        </AdminResourceEditPage>
    );
}