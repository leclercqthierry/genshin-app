export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import WeaponForm from "../../_components/weapon-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/weapon/actions/update";
import { makeWeaponAdminService } from "@/services/supabase/weapon";
import { makeMobDropSetAdminService } from '@/services/supabase/mob-drop-set';
import { makeEliteDropSetAdminService } from "@/services/supabase/elite-drop-set";
import { makeWeaponElevationSetAdminService } from "@/services/supabase/weapon-elevation-set";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditWeaponPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;

    const weaponElevationSetAdminService = await makeWeaponElevationSetAdminService();
    const eliteDropSetAdminService = await makeEliteDropSetAdminService();
    const weaponAdminService = await makeWeaponAdminService();
    const mobDropSetAdminService = await makeMobDropSetAdminService();

    const weapon = await weaponAdminService.getOne(Number(id));
    const mobDropSets = await mobDropSetAdminService.getAll();
    const eliteDropSets = await eliteDropSetAdminService.getAll();
    const weaponElevationSets = await weaponElevationSetAdminService.getAll();

    if (!weapon) {
        return <p>Arme introuvable</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier l'arme">
            <WeaponForm
                action={handleUpdate.bind(null, weapon.id)}
                submitLabel="Mettre à jour"
                mobDropSets={mobDropSets}
                eliteDropSets={eliteDropSets}
                weaponElevationSets={weaponElevationSets}
                defaultValues={{
                    name: weapon.name,
                    imageUrl: weapon.imageUrl,
                    miniUrl: weapon.miniUrl,
                    rarity: weapon.rarity,
                    weaponType: weapon.weaponType,
                    subStat: weapon.subStat,
                    source: weapon.source,
                    description: weapon.description,
                    mobDropSetId: weapon.mobDropSetId,
                    eliteDropSetId: weapon.eliteDropSetId,
                    weaponElevationSetId: weapon.weaponElevationSetId,
                }}
            />
        </AdminResourceEditPage>
    );
}