export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import WeaponElevationSetForm from "../../_components/weapon-elevation-dungeon-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/weapon-elevation-set/actions/update";
import { makeWeaponElevationSetAdminService } from "@/services/supabase/weapon-elevation-set";
import { FARM_DAYS } from "@/constants/farm-days";


type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditWeaponElevationSetPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const weaponElevationSetAdminService = await makeWeaponElevationSetAdminService();
    const weaponElevationSet = await weaponElevationSetAdminService.getOne(Number(id));

    if (!weaponElevationSet) {
        return <p>Set de drops de donjon d&apos;élévation d&apos;arme introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier le set de drops de donjon d'élévation d'arme">
            <WeaponElevationSetForm
                action={handleUpdate.bind(null, weaponElevationSet.id)}
                submitLabel="Mettre à jour"
                farmDays={FARM_DAYS}
                defaultValues={{
                    name: weaponElevationSet.name,
                    rarity2Url: weaponElevationSet.rarity2Url,
                    rarity3Url: weaponElevationSet.rarity3Url,
                    rarity4Url: weaponElevationSet.rarity4Url,
                    rarity5Url: weaponElevationSet.rarity5Url,
                    farmDaysIndex: weaponElevationSet.farmDaysIndex,
                }}
            />
        </AdminResourceEditPage>
    );
}